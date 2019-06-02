var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 30, 40);
scene.add(pointLight);

// I will need a geometry, in this case BoxGeometery
var geometry = new THREE.BoxGeometry(20, 20, 20),

// I will need a material for the cube
material = new THREE.MeshStandardMaterial({
        color: 0xff0000
    });

// I need a mesh that will tie a geometry and material together
mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

renderer.render(scene, camera);
