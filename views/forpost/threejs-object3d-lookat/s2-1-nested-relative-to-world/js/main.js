//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//  GROUP, MESH
//-------- ----------
// creating a group
const group = new THREE.Group();
// creating and adding a pointer mesh to the group
const geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
geo.rotateX(Math.PI * 0.5);
const pointer = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
pointer.position.set(0, 0, 0);
group.add(pointer);
// creating and adding a cube
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(0, 0, 4);
group.add(cube);
// box helper for the group
group.add(new THREE.BoxHelper(group));
// changing the position of the group to something other that 0,0,0
group.position.set(-2.0, 0, -2.0);
// add group to the scene
scene.add(group);
// POINTER LOOKS AT CUBE POSITION RELATIVE TO THE SCENE, BUT NOT RELATIVE TO THE GROUP
pointer.lookAt(cube.position);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
