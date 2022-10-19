//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(3, 5, 5);
camera.lookAt(0, -0.75, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_box = new THREE.BoxGeometry(4.5, 3, 4.5);
const geo_sphere = new THREE.SphereGeometry(1.0, 30, 30);
// COMPUTE THE BOUNDING BOX
geo_box.computeBoundingBox();
//-------- ----------
// MESH, MATERIAL
//-------- ----------
// main mesh object using geo_box
const mesh = new THREE.Mesh( geo_box, new THREE.MeshNormalMaterial({wireframe: true}) );
scene.add(mesh);
// getting a ref to bounding box of geo_box
// and usinbg that to set the position of other mesh objects
const bb = geo_box.boundingBox;
const material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});
const mesh1 = new THREE.Mesh( geo_sphere, material );
scene.add(mesh1);
mesh1.position.copy(bb.min);
const mesh2 = new THREE.Mesh( geo_sphere, material );
scene.add(mesh2);
mesh2.position.copy(bb.max);
//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);