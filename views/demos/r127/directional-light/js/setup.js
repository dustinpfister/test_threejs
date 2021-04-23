// Have a scene
var scene = new THREE.Scene();

// ADD A DIRECTIONAL LIGHT to the scene when doing so
// I can set a color, and intensity with optional arguments
var dl = new THREE.DirectionalLight(0xffffff, 1);
// set a position for the light
dl.position.set(3,2,1);
scene.add(dl);

// have a camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, 0, 0);
// Have a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// Add Something in the scene that makes use of a material
// that will respond to light such as the standard material
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
scene.add(mesh);
// Render the scene
renderer.render(scene, camera);
