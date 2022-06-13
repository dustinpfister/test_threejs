//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
//camera.position.set(-12, 5, 12);
camera.position.set(0, 0, 25);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES GROUP(s)
//******** **********
var lgOpt = {
    forLineStyle: function(m, i, ud, lineGroup){
        m.linewidth = 8;
        var arr = ['red', 'lime', 'cyan', 'purple', 'blue', 'yellow', 'orange', 'pink']
        m.color = new THREE.Color( arr[ i % arr.length] );
        m.transparent = true;
        m.opacity = 0.25;
    }
};
var lgBaseData = {
    waveHeight: 7,
    simpleWave: false,
    waveCount: 4,
    radianOffsetLoops: 1,
    sizeWidth: 15,
    sizeHeight: 15
};
var lg1 = LineGroup.create('sinGrid', lgOpt);
lg1.rotation.y = Math.PI * 0.0;
scene.add(lg1);
var lg2 = LineGroup.create('sinGrid', lgOpt);
lg2.rotation.y = Math.PI * 0.5;
scene.add(lg2);
var lg3 = LineGroup.create('sinGrid', lgOpt);
lg3.rotation.y = Math.PI * 1.0;
scene.add(lg3);
var lg4 = LineGroup.create('sinGrid', lgOpt);
lg4.rotation.y = Math.PI * 1.5;
scene.add(lg4);

//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0,-2, 0);
controls.update();


var fps = 30,
lt = new Date(),
frame = 0,
frameMax = 90;
var loop = function () {
    var now = new Date(),
    per = frame / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // update line group (s)
        LineGroup.set(lg1, frame, frameMax, lgBaseData);
        LineGroup.set(lg2, frame, frameMax, lgBaseData);
        LineGroup.set(lg3, frame, frameMax, lgBaseData);
        LineGroup.set(lg4, frame, frameMax, lgBaseData);
        // render
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
