//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5)); // grid helper
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(10, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GROUPS
//-------- ----------
const group1 = BoxGroup.create();
group1.position.set(-15, 0, 0);
scene.add(group1);
const group2 = BoxGroup.create();
group2.position.set(-15, 0, -15);
scene.add(group2);
const group3 = BoxGroup.create();
console.log(group3.name);
scene.add(group3); // add group
//-------- ----------
// LOOP
//-------- ----------
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
        group1.userData.heading = 360 * per;
        BoxGroup.update(group1);
        group2.userData.heading = 90;
        group2.userData.pitch = 180 * Math.sin(Math.PI * 4 * per);
        BoxGroup.update(group2);
        group3.userData.heading = 360 * per;
        group3.userData.pitch = 180 * Math.sin(Math.PI * 4 * per);
        group3.position.z = -5 + 10 * bias;
        BoxGroup.update(group3);
        renderer.render(scene, camera);
        lt = now;
        frame += fps * secs;
        frame %= maxFrame;
    }
};
loop();
