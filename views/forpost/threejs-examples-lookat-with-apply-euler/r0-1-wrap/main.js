//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);

// make a collection of them
const createWrap = function(){
    const wrap = new THREE.Group();
    let i = 0;
    const count = 50;
    while(i < count){
        //const g = mkModel('g' + i);
        const g = airplane.create('g' + i);
        wrap.add(  g );
        i += 1;
    }
    wrap.scale.set(0.5, 0.5, 0.5);
    return wrap;
};
// position a wrap object
const positionWrap = function(wrap, bias, ringCount){
    bias = bias === undefined ? 1 : bias;
    ringCount = ringCount === undefined ? 5 : ringCount;
    const count = wrap.children.length,
    perRing = count / ringCount,
    yaStep = 90 / ringCount,
    radius = 15; 
    let i = 0;
    while(i < count){
        const per = i / count;
        var g = wrap.children[i];
        const ring = Math.floor( i / perRing );
        const rPer = ( i - perRing * ring) / perRing;
        const x = Math.PI * 2 * rPer, 
        s = ring < ringCount / 2 ? 0 : 1;
        y = Math.PI / 180 * yaStep * ring * bias, 
        z = 0;
        const e = new THREE.Euler(x, y, z);
        g.position.set(0, 0, radius).applyEuler( e );
        g.lookAt(0, 0, 0);
        i += 1;
    }
};
//-------- ----------
// MESH
//-------- ----------
const wrapA = createWrap();
positionWrap(wrapA, 1);
scene.add(wrapA);
const wrapB = createWrap();
positionWrap(wrapB, -1);
scene.add(wrapB);
//-------- ----------
// LOOP
//-------- ----------
if(THREE.OrbitControls){
    new THREE.OrbitControls(camera, renderer.domElement);
}
let = lt = new Date(), frame = 0;
const fps = 30, maxFrame = 300;
const update = (frame, maxFrame, secs) => {
    const a1 = frame / maxFrame,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    positionWrap(wrapA, 1 - 1 * a2, 5);
    positionWrap(wrapB, -1 + 1 * a2, 5 );
};
const loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        update(frame, maxFrame, secs);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
