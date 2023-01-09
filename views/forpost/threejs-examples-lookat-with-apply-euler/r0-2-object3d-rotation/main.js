// r0-2-curves demo from threejs-examples-lookat-with-apply-euler
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
//-------- ----------
// MESH
//-------- ----------
const obj1 = airplane.create('g-0');
scene.add(obj1);
obj1.lookAt(1,0,0)
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

    // NEW SET POS METHOD
    const x = Math.PI * 2 * a1, 
    y = Math.PI * 1.25, 
    z = 0;
    const radius = 5;
    // USING APPLY EULER TO SET POSITION
    const e = new THREE.Euler(x, y, z);
    obj1.position.set(0, 0, radius).applyEuler( e );
    // object3d rotation being used in place of Look At
    obj1.rotation.y = Math.PI * 0.25;
    obj1.rotation.x = Math.PI * 2 * a1;
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
