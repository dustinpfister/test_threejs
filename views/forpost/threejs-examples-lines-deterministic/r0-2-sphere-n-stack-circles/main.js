//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(12, 12, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES GROUP(s)
//-------- ----------
// built in 'tri' type
const lg1Base = {
    homeVectors: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
    ], 
    lerpVectors: [
        new THREE.Vector3(-5, 0, -5),
        new THREE.Vector3(-5, 0, 5),
        new THREE.Vector3(5, 0, 0)
    ],
    rBase: 0,
    rDelta: 2
};
const lg1 = LineGroup.create();
lg1.position.set(3, 0, 0);
lg1.scale.set(0.5, 0.5, 0.5)
scene.add(lg1);
// the 'circleStack' type
const lg2 = LineGroup.create('circleStack', { lineCount: 20 } );
lg2.position.set(-5, 0, -5);
scene.add(lg2);
// the 'sphereCircles' type base off my other lines example
const lg3 = LineGroup.create('sphereCircles', { lineCount: 20 } );
lg3.position.set(-5, 0, 5);
scene.add(lg3);
//-------- ----------
// LOOP
//-------- ----------
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}
const fps = 30,
frameMax = 90;
let lt = new Date(),
frame = 0;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // update line group (s)
        LineGroup.set(lg1, frame, frameMax, lg1Base);
        LineGroup.set(lg2, frame, frameMax, {});
        LineGroup.set(lg3, frame, frameMax, {});
        // render
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
