//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(3, 5, 5);
camera.lookAt(0, -0.75, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo = new THREE.BoxGeometry(4.5, 3, 4.5);
//-------- ----------
// MESH, MATERIAL
//-------- ----------
// main mesh object using geo_box
const mesh = new THREE.Mesh( geo, new THREE.MeshNormalMaterial({wireframe: true}) );
scene.add(mesh);
//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);