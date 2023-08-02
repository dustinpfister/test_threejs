// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide
});
// ---------- ----------
// GEOMETRY MESH
// ---------- ----------
const geo = new THREE.PlaneGeometry(5, 5, 1, 1);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// LOOP
// ---------- ----------
let frame = 0;
const maxFrame = 120;
const loop = () => {
    requestAnimationFrame(loop);
    const a_frame = frame / maxFrame;
    mesh.rotation.y = Math.PI * 2 * a_frame;
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();