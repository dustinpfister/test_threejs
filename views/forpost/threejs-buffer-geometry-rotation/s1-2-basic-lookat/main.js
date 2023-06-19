//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
// USING BUFFER GEOMERTY ROTATEX METHOD TO ADJUST THE CONE TO WORK WELL
// WITH THE LOOKAT METHOD OF THE Object3d class
geometry.rotateX(Math.PI * 0.5);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(7, 7));
const cone = new THREE.Mesh(
     geometry,
     new THREE.MeshNormalMaterial()); 
cone.add(new THREE.BoxHelper(cone)); // adding a box helper
scene.add(cone); // add custom to the scene
// adding a cube to have the cone point to
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(3, 0, 3);
scene.add(cube)
cone.lookAt(cube.position); // using Object3d (base class of Mesh) lookAt
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(6, 8, 6);
camera.lookAt(cone.position);
renderer.render(scene, camera);
