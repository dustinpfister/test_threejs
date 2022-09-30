//-------- ----------
// WINDOW
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 640 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 240);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// revision used
console.log('r' + THREE.REVISION)
// add something to scene
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial() ))
// render
renderer.render(scene, camera);
