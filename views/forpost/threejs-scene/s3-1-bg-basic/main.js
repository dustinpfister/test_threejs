//-------- ----------
// SCENE OBJECT - SETTING SOLID BACKGROUND COLOR
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0.4, 0.6);
//-------- ----------
// CAMERA, RENDERER, MESH
//-------- ----------
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(2, 2, 2); 
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), new THREE.MeshNormalMaterial());
scene.add(mesh);
renderer.render(scene, camera);
