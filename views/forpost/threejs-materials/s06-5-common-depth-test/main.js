// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material_mesh = new THREE.MeshNormalMaterial();
const material_points = new THREE.PointsMaterial({
    size: 5,
    sizeAttenuation: false,
    depthTest: false
});
// ---------- ----------
// GEOMETRY MESH
// ---------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8);
scene.add( new THREE.Mesh(geo, material_mesh) );
scene.add( new THREE.Points(geo, material_points) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 0.75, 1.5);
camera.lookAt(0, -0.15, 0);
renderer.render(scene, camera);
