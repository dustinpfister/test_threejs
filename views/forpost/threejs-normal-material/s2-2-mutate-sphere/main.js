// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10, 10 ) );
const mesh_sphere = new THREE.Mesh( new THREE.SphereGeometry(0.5, 16, 16), material);
scene.add(mesh_sphere);
let helper = null
if(THREE.VertexNormalsHelper){
    helper = new THREE.VertexNormalsHelper( mesh_sphere, 0.1, 0x00ff00 );
    scene.add(helper);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.4, 0.25, 1.5);
camera.lookAt(0,0,0);
const sm = {
   FPS_UPDATE: 20,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date(),
   v_delta: new THREE.Vector3(0, 1, 0),
   att_normal : mesh_sphere.geometry.getAttribute('normal'),
   att_normal_home : mesh_sphere.geometry.getAttribute('normal').clone()
};
const update = function(sm){
    const a_frame = sm.frame / sm.FRAME_MAX;
    const a_framebias = 1 - Math.abs( 0.5 - a_frame ) / 0.5;
    const a_framebias2 = 1 - Math.abs( 0.5 - (a_frame * 2 % 1) ) / 0.5;
    let i = 0;
    const count = sm.att_normal.count;
    while(i < count){
        const v_home = new THREE.Vector3();
        v_home.x = sm.att_normal_home.getX(i);
        v_home.y = sm.att_normal_home.getY(i);
        v_home.z = sm.att_normal_home.getZ(i);
        const v_negate = v_home.clone().negate();
        const v = v_home.clone().lerp(v_negate, a_framebias).lerp( sm.v_delta, a_framebias2 );
        sm.att_normal.setXYZ(i, v.x, v.y, v.z);
        i += 1;
    }
    sm.att_normal.needsUpdate = true;
    if(helper){
        helper.update();
    }
    camera.position.x = 1.4 - 2.8 * a_framebias;
    camera.lookAt( 0, 0, 0 );
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        update(sm);
        renderer.render(scene, camera);
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
