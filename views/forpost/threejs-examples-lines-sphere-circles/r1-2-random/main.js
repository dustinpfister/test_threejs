//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
// seeded random
const opt = { maxRadius: 8, forPoint: 'seededRandom', circleCount: 30, pointsPerCircle: 50 };
var g1 = LinesSphereCircles.create(opt);
scene.add(g1);
//-------- ----------
// LOOP
//-------- ----------
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
frameMax = 300;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        LinesSphereCircles.setByFrame(g1, frame, frameMax, opt);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
