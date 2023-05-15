//-------- ----------
// CANVAS - creating a canvas element with javaScript code and appending to HTML
//-------- ----------
const canvas = document.createElement('canvas');
( document.getElementById('demo') || document.body ).appendChild(canvas);
//-------- ----------
// RENDERER, SCENE, CAMERA
//-------- ----------
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
renderer.setSize(640, 480, false);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.5, 1000);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
