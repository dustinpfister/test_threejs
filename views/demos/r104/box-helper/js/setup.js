var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30), new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
var box = new THREE.BoxHelper(mesh, 0xffffff);
mesh.add(box);
scene.add(mesh);

// light
var light = new THREE.PointLight(0xffffff);
light.position.set(0,2,2)
scene.add(light);

var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
scene.add(mesh);
renderer.render(scene, camera);
