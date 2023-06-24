//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
var renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LAMBERT MATERIAL
//-------- ----------
const material = new THREE.MeshLambertMaterial({
            color: 0x00afaf,
            side: THREE.DoubleSide
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material);
scene.add(mesh);
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 2, 3)
scene.add(dl)
//-------- ----------
// RENDERER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
