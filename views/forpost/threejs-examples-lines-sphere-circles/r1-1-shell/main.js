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
// plain
var g1 = LinesSphereCircles.create({ maxRadius: 4, pointsPerCircle: 20 });
g1.position.set(-10,0,0)
scene.add(g1);
// seeded random
var g2 = LinesSphereCircles.create({ maxRadius: 8, forPoint: 'seededRandom' });
g2.position.set(-5,-2,-25)
scene.add(g2);
// seashell
var opt = {
    circleCount: 20,
    maxRadius: 4,
    pointsPerCircle: 30,
    colors: [0x004444, 0x00ffff],
    linewidth: 4,
    forPoint: 'seaShell',
    forOpt: function(opt, per, bias, frame, frameMax){
        opt.minRadius = 1 + 3 * bias;
    }
};
var g3 = LinesSphereCircles.create(opt);
scene.add(g3);
LinesSphereCircles.setByFrame(g3, 25, 100, opt);
var g4 = LinesSphereCircles.create(opt);
g4.position.set(0, -8, 0);
scene.add(g4);
var g5 = LinesSphereCircles.create(opt);
g5.position.set(-8, -8, 0);
scene.add(g5);
var g6 = LinesSphereCircles.create(opt);
g6.position.set(-16, -8, 0);
scene.add(g6);
var g7 = LinesSphereCircles.create(opt);
g7.position.set(-24, -8, 0);
scene.add(g7);
var g8 = LinesSphereCircles.create(opt);
g8.position.set(-32, -8, 0);
scene.add(g8);
var g9 = LinesSphereCircles.create(opt);
g9.position.set(-40, -8, 0);
scene.add(g9);
//-------- ----------
// LOOP
//-------- ----------
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 15,
lt = new Date(),
frame = 0,
frameMax = 300;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        LinesSphereCircles.setByFrame(g3, frame, frameMax, opt);
        LinesSphereCircles.setByFrame(g4, frame, frameMax, opt);
        LinesSphereCircles.setByFrame(g5, frame, frameMax, opt);
        LinesSphereCircles.setByFrame(g6, frame, frameMax, opt);
        LinesSphereCircles.setByFrame(g7, frame, frameMax, opt);
        LinesSphereCircles.setByFrame(g8, frame, frameMax, opt);
        LinesSphereCircles.setByFrame(g9, frame, frameMax, opt);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
