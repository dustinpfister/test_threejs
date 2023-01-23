//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECT3D INSTANCE
//-------- ----------
var obj = new THREE.Object3D();
obj.rotation.set(0, 0, Math.PI * 1.75);
//-------- ----------
// MESH
//-------- ----------
// creating a mesh that has object3d as a base class
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// copying OBJECT3d rotation property instance of Euler in obj 
// to the instance of Euler the mesh
mesh.rotation.copy(obj.rotation);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2,2,2);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
