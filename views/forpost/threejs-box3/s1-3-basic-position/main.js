//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
//-------- ----------
// BOX3 by way of bufferGeometry.computeBoudningBox
//-------- ----------
// UISNG COMPUTE BOUNDING BOX OF THE GEOMETRY
// TO CREATE A BOX3 for the mesh at the boundingBox
// property of the geometry
mesh.geometry.computeBoundingBox();
// GETTING SIZE
const s = new THREE.Vector3();
const box3 = mesh.geometry.boundingBox;
box3.getSize(s);
// USING SIZE VECTOR3 to set Y position of mesh
mesh.position.y = s.y / 2;
scene.add(mesh);
// grid helper
scene.add( new THREE.GridHelper(10, 10))
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0.4, 0);
renderer.render(scene, camera);