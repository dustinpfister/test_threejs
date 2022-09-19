//-------- ----------
// HELPERS
//-------- ----------
const MAIN_RADIUS = 8,
DONUT_COUNT = 30;
// create a donut child for a group
const createDonutChild = (index, len) => {
    const per = index / len,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    radius = 0.6 + 2.3 * bias,
    tubeRadius = 0.125 + 0.25 * bias,
    radialSegments = 32,
    tubeSegments = 32;
    const donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshStandardMaterial({
           color: 0xffffff,
           emissive: 0x2a0000
        }));
    donut.geometry.rotateY(Math.PI * 0.5);
    return donut;
};
// create a group of donuts
const createDonutGroup = () => {
    let i = 0;
    const len = DONUT_COUNT,
    group = new THREE.Group();
    while(i < len){
        const per = i / len,
        radian = Math.PI * 2 * per;
        const donut = createDonutChild(i, len);
        donut.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        donut.lookAt(0, 0, 0);
        group.add(donut);
        i += 1;
    }
    return group;
};
//-------- ----------
// SCENE, CAMERA, LIGHT, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(2, 0, 0);
camera.add(light);
scene.add(camera);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADDING GROUP TO SCENE
//-------- ----------
const group = createDonutGroup();
scene.add(group);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
frame = 0;
const maxFrame = 1200,
fps = 24;
const loop = function(){
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        const radian = Math.PI * 2 * per;
        camera.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        camera.lookAt(Math.cos(radian + 0.5) * MAIN_RADIUS, Math.sin(radian) * 0.5, Math.sin(radian - 0.5) * MAIN_RADIUS);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();