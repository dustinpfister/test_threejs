//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 3.0);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH, MATERIAL
//-------- ----------
// creating a box mesh with the Box Geometry constructor,
// and the normal material
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshDepthMaterial());
box.position.set(0, 0.2, 0);
// add the box mesh to the scene
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(), frame = 0;
const maxFrame = 100, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // adjusting near and far values of the camera
        camera.near = 0.4 + 0.4 * bias;
        camera.far = 1 + 2 * bias;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        lt = now;
        frame += 1;
        frame %= maxFrame;
    }
};
loop();
