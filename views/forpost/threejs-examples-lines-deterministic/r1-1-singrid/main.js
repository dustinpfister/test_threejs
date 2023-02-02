//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(25, 10, 25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES GROUP(s)
//-------- ----------
const lgOpt = {
    forLineStyle: function(m, lineIndex, lineCount, lineGroup, frameData, baseData){
        m.linewidth = 8;
        var arr = ['red', 'lime', 'cyan', 'purple', 'blue', 'yellow', 'orange', 'pink']
        m.color = new THREE.Color( arr[ lineIndex % arr.length] );
        m.transparent = true;
        m.opacity = 0.4 + 0.6 * frameData.bias;
    }
};
const lgBaseData = {
    waveHeight: 7,
    simpleWave: false,
    waveCount: 4,
    radianOffsetLoops: 1,
    sizeWidth: 15,
    sizeHeight: 15
};
const lg1 = LineGroup.create('sinGrid', lgOpt);
lg1.rotation.y = Math.PI * 0.0;
scene.add(lg1);
const lg2 = LineGroup.create('sinGrid', lgOpt);
lg2.rotation.y = Math.PI * 0.5;
scene.add(lg2);
const lg3 = LineGroup.create('sinGrid', lgOpt);
lg3.rotation.y = Math.PI * 1.0;
scene.add(lg3);
const lg4 = LineGroup.create('sinGrid', lgOpt);
lg4.rotation.y = Math.PI * 1.5;
scene.add(lg4);
//-------- ----------
// LOOP
//-------- ----------
const fps = 30,
frameMax = 90;
let lt = new Date(),
frame = 0;
const loop = function () {
    const now = new Date(),
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
