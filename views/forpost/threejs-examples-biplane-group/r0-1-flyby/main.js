//-------- ----------
// SCENE, RENDERER, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 1000);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// grid
scene.add(new THREE.GridHelper(1000, 100, 0xff0000, 0x4a4a00));
// biplane groups
const biGroups = new THREE.Group();
scene.add(biGroups);
let i = 0;
while (i < 9) {
    const  group = BiplaneGroup.create();
    group.position.z = -50 + 50 * (i % 3);
    group.position.y = 50 - 50 * Math.floor(i / 3);
    group.rotation.y = Math.PI * 0.5;
    biGroups.add(group);
    i += 1;
}
// light
const dl = new THREE.DirectionalLight(0xffffff, 0.9);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(dl);
scene.add(al);
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(80, 80, 80);
let lt = new Date();
function loop() {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    biGroups.children.forEach(function (biGroup) {
        BiplaneGroup.update(biGroup, secs);
        if (!biGroup.userData.active) {
            biGroup.position.x = -200;
            biGroup.userData.pps = 32 + Math.round(64 * Math.random());
            biGroup.userData.active = true;
        } else {
            biGroup.position.x += biGroup.userData.pps * secs;
            if (biGroup.position.x >= 200) {
                biGroup.userData.active = false;
            }
        }
    });
    controls.update();
    renderer.render(scene, camera);
    lt = now;
};
loop();
