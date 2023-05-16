//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
const geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
const cone = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial());
// USING BUFFER GEOMERTY ROTATEX METHOD
cone.geometry.rotateX(Math.PI * 0.5);
cone.add(new THREE.BoxHelper(cone)); // adding a box helper
scene.add(cone); // add custom to the scene
// adding a cube to have the cone point to
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(3, 0, 3);
scene.add(cube)
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8,8,8);
cone.lookAt(cube.position);
camera.lookAt(cone.position);
renderer.render(scene, camera);
