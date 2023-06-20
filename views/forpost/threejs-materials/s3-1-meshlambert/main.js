//-------- ----------
// Scene
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE LAMBERT MATERIAL
//-------- ----------
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xff0000,
    emissiveIntensity: 0.5
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(4, 2, 1);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera); ;
