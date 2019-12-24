var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

// add a plane
var width = 10,
height = 10,
widthSegments = 1,
heightSegments = 1;
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height, widthSegments, heightSegments),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }));
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane);

renderer.render(scene, camera);
