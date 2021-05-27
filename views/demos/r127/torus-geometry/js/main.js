// creating a donut mesh with the Torus Geometry constructor,
// and the normal material
var donut = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.25, 16, 32),
        new THREE.MeshNormalMaterial());
 
// creating a scene
var scene = new THREE.Scene();
 
// add the donut mesh to the scene
scene.add(donut);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.5, 2);
camera.lookAt(0, 0.25, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
