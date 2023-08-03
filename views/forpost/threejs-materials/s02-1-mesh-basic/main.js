//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE BASIC MATERIAL
//-------- ----------
const data = [
    100,100,100,255,  150,150,150,255,  150,150,150,255,  100,100,100,255,
    150,150,150,255,  200,200,200,255,  200,200,200,255,  150,150,150,255,
    150,150,150,255,  200,200,200,255,  200,200,200,255,  150,150,150,255,
    100,100,100,255,  150,150,150,255,  150,150,150,255,  100,100,100,255
];
const texture = new THREE.DataTexture(new Uint8Array( data ), 4, 4);
texture.needsUpdate = true;
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10))
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.75, 1.2, 1.5);
camera.lookAt(0, -0.10, 0);
renderer.render(scene, camera); // render

