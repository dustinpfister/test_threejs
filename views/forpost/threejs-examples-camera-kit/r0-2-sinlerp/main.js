//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ********** **********
// ANIMATION LOOP
// ********** **********
let frame = 0,
lt = new Date();
const maxFrame = 90;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / 24) {
        const v1 = new THREE.Vector3(8, 4, 8);
        const v2 = new THREE.Vector3(-8, -4, 8);
        cameraKit.sinLerp(camera, v1, v2, bias, { bMulti: 0.2 } );
        const v3 = new THREE.Vector3(0, 0, 0);
        camera.lookAt(v3);
        renderer.render(scene, camera);
        frame += 20 * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();

