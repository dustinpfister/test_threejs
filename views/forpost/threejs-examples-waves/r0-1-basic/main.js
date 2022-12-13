//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.001, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// POINTS
//-------- ----------
const w = 30, h = 30;
const tw = 4, th = 4;
const opt_waves = {
   width: w,
   depth: h,
   xStep: tw / w,
   zStep: th / h
};
const points = waveMod.create(opt_waves);
points.position.set(tw / 2 * -1, 0, th / 2 * -1);
scene.add(points);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // calling update method
        waveMod.update(points, per * 8 % 1, opt_waves);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
