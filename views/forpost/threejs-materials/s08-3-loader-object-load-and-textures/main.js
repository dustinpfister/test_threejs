// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LOAD JSON FILE - that is in the object format with geometry, material, and texture
// ---------- ----------
const loader = new THREE.ObjectLoader();
loader.load('./demo.json', ( mesh ) => {
    scene.add(mesh)
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
