//-------- ----------
// SCENE OBJECT - SETTING SOLID BACKGROUND COLOR
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0.4, 0.6);
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2); 
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
