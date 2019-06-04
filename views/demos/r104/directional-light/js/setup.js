// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(3.25, 3.25, 3.25);
camera.lookAt(0, 0, 0);

// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,0.5,0.25)
scene.add(dl);

// Something in the scene
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
scene.add(mesh);
mesh.position.set(2,1,0)

dl.target = mesh;

renderer.render(scene, camera);
