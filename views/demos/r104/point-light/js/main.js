var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(0, 40, 40);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);
pointLight.add(new THREE.Mesh(
                new THREE.SphereGeometry(1, 10, 10),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff
                })));
scene.add(pointLight);

var addCube = function (scene, size, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    material = new THREE.MeshStandardMaterial({
            color: 0xff0000
        });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
};

addCube(scene, 10, 15, 0, 0);
addCube(scene, 10, -15, 0, 0);
addCube(scene, 10, 0, -15, 0);
addCube(scene, 10, 0, 0, -15);

renderer.render(scene, camera);
