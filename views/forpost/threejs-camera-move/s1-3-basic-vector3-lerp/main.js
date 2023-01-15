//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(3, 20, 20),
    new THREE.MeshNormalMaterial());
mesh2.position.set(-5, 1, 5);
scene.add(mesh2);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
lt = new Date(),
frame = 0;
const fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30,       // fps rate to move camera
frameMax = 300;
// START AND END VECTOR3 OBJECTS
const vpos_start = new THREE.Vector3(5, 5, 5);
const vpos_end = new THREE.Vector3(1, 0, -4);
// update function
const update = () => {
    // alpha values
    const a1 = frame / frameMax;
    const a2 = (1 - Math.abs(0.5 - a1) / 0.5);
    // MOVE CAMERA BY WAY OF THE VECTOR3 LERP METHOD
    camera.position.copy(vpos_start).lerp(vpos_end, a2);
    // USING VECTOR3 LERP TO HELP CREATE A LOOK AT POINT OVER TIME ALSO
    camera.lookAt( mesh1.position.clone().lerp(mesh2.position, a2) )
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        // MOVING THE CAMERA IN THE LOOP
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
