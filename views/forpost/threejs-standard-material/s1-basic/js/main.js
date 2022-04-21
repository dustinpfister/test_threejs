// SCENE, CAMERA, RENDERER
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.0, 1.7, 2.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// LIGHT
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 4, 2);
scene.add(dl);
// CREATING A MESH WITH THE STANDARD MATERIAL
scene.add( new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial( { color: 'red'} ) ) );
// camera and renderer
renderer.render(scene, camera);