//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// THE MESH BASIC MATERIAL IS THE DEFAULT MATERIAL IF NO MATERIAL IS GIVEN
//-------- ----------
const box = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1) );
console.log(box.material.type); // MeshBasicMaterial
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
