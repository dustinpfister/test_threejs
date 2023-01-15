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
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
fps_update = 20,
fps_movement = 30,
frame = 0,
frameMax = 300,
lt = new Date();
const update = (secs) => {
    const per = frame / frameMax,
    bias = (1 - Math.abs(per - 0.5) / 0.5);
    // MOVEING THE MESH OBJECT
    mesh.position.x = -5 + 10 * bias
    // SETTING POSITION OF THE CAMERA RELATIVE TO THE POSITION OF THE MESH
    camera.position.copy(mesh.position).add( new THREE.Vector3(3, 3 - 6 * bias, 3) );
    // CALLING THE LOOKAT METHOD OF THE CAMERA
    camera.lookAt(mesh.position);
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
