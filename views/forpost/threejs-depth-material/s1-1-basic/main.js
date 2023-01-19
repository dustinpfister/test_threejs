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
box.position.set(0, 0.20, 0);
// add the box mesh to the scene
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
