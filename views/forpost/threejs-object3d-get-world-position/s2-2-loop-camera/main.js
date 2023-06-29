//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const update_group = (group, a1=0 ) => {
    let i = 0;
    const len = 10;
    while(i < len){
        const a_child = i / len;
        const mesh = group.children[i];
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * ( (a1 + a_child) / 2 );
        e.z = Math.PI * 2 * ( (a1 + a_child) / 2 );
        mesh.position.set(1, 0, 0).applyEuler(e).multiplyScalar(3);
        i += 1;
    }
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// group
const material = new THREE.MeshNormalMaterial();
const geometry = new THREE.SphereGeometry(0.5, 20, 20);
const group = new THREE.Group();
let i = 0;
const len = 10;
while(i < len){
   const mesh = new THREE.Mesh(geometry, material);
   group.add(mesh);
   i += 1;
}
scene.add(group);
// static mesh
const mesh_static = new THREE.Mesh(geometry, material);
mesh_static.position.set(-5,0,-5);
scene.add(mesh_static)
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, FPS_MOVEMENT = 30, FRAME_MAX = 900;
let secs = 0, frame = 0, lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = Math.sin( Math.PI * 2 * (a1 * 4 % 1) );
    const a3 = Math.sin( Math.PI * 1 * (a1 * 1 % 1) );
    update_group(group, a2);
    const v2 = new THREE.Vector3();
    group.children[5].getWorldPosition(v2);
    const v1 = mesh_static.position.clone();
    const v3 = v1.clone().lerp(v2, a3);
    camera.position.copy( v3.clone().add( new THREE.Vector3(-3, 3, 3) ));
    camera.lookAt(v3);
};
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
