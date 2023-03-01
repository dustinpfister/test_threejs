// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 1, 15);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// INIT METHOD
// ---------- ----------
const init = function () {
    // add plane to the scene
    const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5, 8, 8),
            new THREE.MeshDepthMaterial({
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // add a cube to the scene
    const cube = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshDepthMaterial({}));
    cube.position.set(0, 1.1, 0);
    scene.add(cube);
    // setting position of the camera
    // position is a property of Object3D
    // and the value is an instance of Vector3
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    // update aspect and fov
    camera.aspect = .5 + 1.5 * a2;
    camera.fov = 50 + 25 * a2;
    camera.updateProjectionMatrix();
    // change position
    const radian = Math.PI * 2 * a1;
    camera.position.set(
        Math.cos(radian) * 5, 
        5 * Math.sin(Math.PI * 4 * a1), 
        Math.sin(radian) * 5);
    camera.lookAt(0, 0, 0);
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
init();
loop();
