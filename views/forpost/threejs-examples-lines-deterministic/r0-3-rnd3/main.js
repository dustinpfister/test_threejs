//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES GROUP(s)
//-------- ----------
const lg1 = LineGroup.create('rnd3');
scene.add(lg1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(12, 12, 0);
camera.lookAt(lg1.position);
const fps = 30,
frameMax = 90;
let lt = new Date(),
frame = 0;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // update line group
        LineGroup.set(lg1, frame, frameMax);
        // render
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
