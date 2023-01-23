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
// Object3d
//-------- ----------
const obj3d = new THREE.Object3D();
console.log(JSON.stringify(obj3d.position)); // {"x":0,"y":0,"z":0}
obj3d.position.set(-3, 4, 4); 
console.log(JSON.stringify(obj3d.position)); // {"x":3,"y":4,"z":5}
//-------- ----------
// A mesh object is bassed off of Object3d
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshNormalMaterial() );
scene.add(mesh);
mesh.position.copy(obj3d.position);
//-------- ----------
// A Camera is also based on object3d
//-------- ----------
camera.position.set(15, 15, -15);
camera.lookAt(mesh.position);
//-------- ----------
// render static scene
//-------- ----------
renderer.render(scene, camera);
