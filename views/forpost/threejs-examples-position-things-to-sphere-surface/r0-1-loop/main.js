//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
// add wrap the the scene, and some cube objects
const wrap = SphereWrap.createWrap();
scene.add(wrap);
SphereWrap.addObjectToWrap(wrap, 'cube');
SphereWrap.addObjectToWrap(wrap, 'cube2');
// adding a cone rather than the default cube
// some times I might want to rotate the geometry when doing so
// rather than Object3d as I will always have that looking at the origin of the
// sphere wrap group
const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 0.5, 30, 30),
        new THREE.MeshNormalMaterial({
            wireframe: true
        }));
cone.geometry.rotateX(Math.PI * 1.5);
SphereWrap.addObjectToWrap(wrap, 'cone', cone);
//-------- ----------
// LOOP
//-------- ----------
// dist and lat log values
let dist = 1.25, // radius + half of mesh height
latPer = 0.75, // 0 - 1
longPer = 0.5; // 0 - 1
// loop
let lt = new Date(),
frame = 0;
const maxFrame = 600,
fps = 30;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // setting lat and long for 'cube'
        latPer = 0.25 + Math.sin(Math.PI * bias) * 0.25;
        longPer = per;
        SphereWrap.setObjToLatLong(wrap, 'cube', latPer, longPer, dist);
        // rotating cube2
        const obj = wrap.getObjectByName('cube2');
        obj.geometry.rotateZ(Math.PI / 180 * 20 * secs);
        // cone
        SphereWrap.setObjToLatLong(wrap, 'cone', 1 - 0.25 * bias, 1 - 1 * per, dist);
        // whole group
        wrap.position.x = 1 - 2 * bias;
        wrap.position.z = Math.sin(Math.PI * 2 * bias) * 2;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
