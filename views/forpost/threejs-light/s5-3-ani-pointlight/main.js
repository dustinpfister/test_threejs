//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1.00);
scene.add(pl);
const al = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(al);
//-------- ----------
// HELPERS
//-------- ----------
const MAIN_RADIUS = 8,
DOUGHNUT_COUNT = 40;
// create a DOUGHNUT child for a group
const createDoughnutChild = (index, len) => {
    const per = index / len,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    radius = 0.6 + 2.3 * bias,
    tubeRadius = 0.05 + 0.2 * bias,
    radialSegments = 32,
    tubeSegments = 32;
    const doughnut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshStandardMaterial({
           color: 0xffffff
        }));
    doughnut.geometry.rotateY(Math.PI * 0.5);
    return doughnut;
};
// create a group of DOUGHNUTs
const createDoughnutGroup = () => {
    let i = 0;
    const len = DOUGHNUT_COUNT,
    group = new THREE.Group();
    while(i < len){
        const per = i / len,
        radian = Math.PI * 2 * per;
        const doughnut = createDoughnutChild(i, len);
        doughnut.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        doughnut.lookAt(0, 0, 0);
        group.add(doughnut);
        i += 1;
    }
    return group;
};
//-------- ----------
// ADDING GROUP TO SCENE
//-------- ----------
const group = createDoughnutGroup();
scene.add(group);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(15, 15, 15);
camera.lookAt(0, -1, 0);
let lt = new Date(),
frame = 0;
const maxFrame = 90,
fps = 24;
const loop = function(){
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        const radian = Math.PI * 2 * per;
        pl.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();