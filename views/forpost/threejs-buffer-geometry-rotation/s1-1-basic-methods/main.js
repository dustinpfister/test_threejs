//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(1.5, 10, 30, 30),
        new THREE.MeshNormalMaterial());
// USING BUFFER GEOMERTY rotateX, rotateY, and rotateX METHODS
mesh1.geometry.rotateX(Math.PI * 0.5);
mesh1.geometry.rotateY(Math.PI * 0.25);
mesh1.geometry.rotateZ(Math.PI * 0.75);
scene.add(mesh1)
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(6, 8, 6);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
