//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH original
//-------- ----------
const original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(original);
//-------- ----------
// Mesh cloned a bunch of times from original
//-------- ----------
let i = 0;
while (i < 10) {
    const mesh = original.clone();
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
