//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES GROUP
//******** **********

var lg1Base = {
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
var lg1 = LineGroup.create();
lg1.position.set(3, 0, 0);
lg1.scale.set(0.5, 0.5, 0.5)
scene.add(lg1);

var lg2 = LineGroup.create('circleStack', { lineCount: 20 } );
lg2.position.set(-5, 0, -5);
scene.add(lg2);

var lg3 = LineGroup.create('sphereCircles', { } );
lg3.position.set(-5, 0, 5);
scene.add(lg3);

//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
frameMax = 90;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        // update line group (s)
        LineGroup.set(lg1, frame, frameMax, lg1Base);
        LineGroup.set(lg2, frame, frameMax, {});
        LineGroup.set(lg3, frame, frameMax, {});

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
