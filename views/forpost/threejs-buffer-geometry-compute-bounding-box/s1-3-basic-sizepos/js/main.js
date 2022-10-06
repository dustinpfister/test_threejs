//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_box = new THREE.BoxGeometry(1, 4, 3.5);
// COMPUTE THE BOUNDING BOX AND GET bb REF TO IT
geo_box.computeBoundingBox();
const bb = geo_box.boundingBox;
// GET SIZE
const v_size = new THREE.Vector3();
bb.getSize(v_size);
console.log(v_size)
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const mesh = new THREE.Mesh( geo_box, new THREE.MeshNormalMaterial({}) );
scene.add(mesh);
// USE SIZE TO POSITION MESH
mesh.position.set(0, v_size.y / 2, 0)
//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);