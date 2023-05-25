// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// THE MESH
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
// loop
camera.position.set(4, 2, 4);
camera.lookAt(0, 0, 0);
let frame = 0,
lt = new Date();
const maxFrame = 200,
fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    r = Math.PI * 2 * per;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // MOVE the mesh with Object3D.position property that is an instance of Vector3
        mesh.position.set(Math.cos(r) * 2, 0, Math.sin(r) * 2);
        // ROTATE the mesh with the Object3d.rotation property that is an instance of Euler
        mesh.rotation.set(0, r, r * 2);
         // render the scene with the camera
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
