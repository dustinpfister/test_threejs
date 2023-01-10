//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30),  new THREE.MeshNormalMaterial());
scene.add( mesh );
//-------- ----------
// BOX HELPER OF MESH
//-------- ----------
mesh.add( new THREE.BoxHelper(mesh, 0xffffff) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
