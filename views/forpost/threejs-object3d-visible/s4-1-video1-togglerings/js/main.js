//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// make a single box
const makeBox = () => {
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return box;
};
// make a group
const makeGroup = (count) => {
    let i = 0;
    const group = new THREE.Group();
    while(i < count){
        const mesh = makeBox();
        group.add( mesh );
        i += 1;
    }
    return group;
};
// set a group as a ring with options
const setGroupAsRing = (group, opt) => {
    opt = opt || {};
    opt.alpha = opt.alpha === undefined ? 0 : opt.alpha;
    opt.y = opt.y === undefined ? 0 : opt.y;
    opt.scale = opt.scale === undefined ? 1 : opt.scale;
    opt.radius = opt.radius === undefined ? 5 : opt.radius;
    opt.radianOffset = opt.radianOffset === undefined ? 0 : opt.radianOffset;
    opt.toggleAlpha = opt.toggleAlpha === undefined ? 0.10 : opt.toggleAlpha;
    const len = group.children.length;
    group.children.forEach( (mesh, i) => {
        const alpha_mesh = i / len;
        const radian = Math.PI * 2 * alpha_mesh + opt.radianOffset * Math.PI * 2;
        mesh.position.x = Math.cos(radian) * opt.radius;
        mesh.position.z = Math.sin(radian) * opt.radius;
        mesh.position.y = opt.y;
        // VISIBLE BASED ON i AS WELL AS opt.alpha
        const a = opt.alpha % opt.toggleAlpha;
        const b = a < opt.toggleAlpha / 2 ? 0 : 1;
        const c = (i + b) % 2;
        mesh.visible = true;
        if(c){
            mesh.visible = false;
        }
        // scale
        mesh.scale.set(1, 1, 1).multiplyScalar(opt.scale)
        // look at group
        mesh.lookAt(group.position);
    });
}
//-------- ----------
// OBJECTS
//-------- ----------
// box helpers
scene.add( new THREE.GridHelper(10, 10));
const rings = new THREE.Group();
let ri = 0;
while(ri < 10){
    rings.add( makeGroup(10) );
    ri += 1;
}
scene.add(rings);
// add box helpers
rings.children.forEach( (r, ri) => {
    r.children.forEach( (m, mi) => {
        const box = new THREE.BoxHelper( m, 0xffff00 );
        box.material.transparent = true;
        box.material.opacity = 0.25;
        box.material.linewidth = 3;
        box.name = 'box_' + ri + '_' + mi;
        scene.add(box);
    });
});


//const g1 = makeGroup(10);
//scene.add(g1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
   const a1 = frame / frameMax;
   rings.children.forEach((r, ri)=>{
       const a_r = ri / rings.children.length;
       const a_r2 = Math.abs(0.5 - a_r) / 0.5;
       const a3 = Math.sin( Math.PI * 0.25 * a_r);
       setGroupAsRing(r, {
           radius: 5 - 5 * a_r2,
           radianOffset: Math.PI * 0.25 * a_r,
           y: 5 - 10 * a3,
           scale: 0.75 - 0.5 * a_r2,
           alpha: a1
       });
       // update box helpers
       r.children.forEach((m, mi) => {
           const box = scene.getObjectByName('box_' + ri + '_' + mi);
           box.update();
       })
   });
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
