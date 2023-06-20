//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE PHYSICAL MATERIAL
//-------- ----------
const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
scene.add(mesh);
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
