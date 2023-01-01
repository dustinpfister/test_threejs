//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ARROW HELPER
//-------- ----------
const arrow = new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        2.2,
        // color
        0x00ff00);
scene.add(arrow);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0;
const maxFrame = 500;
const loop = function () {
    requestAnimationFrame(loop);
    const per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad),
    y = Math.sin(rad);
    // can change the direction
    const dir = new THREE.Vector3(x, y, 0).normalize();
    arrow.setDirection(dir);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();