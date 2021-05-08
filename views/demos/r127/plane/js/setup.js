var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// add a plane
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 1),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }));
plane.rotation.set(-Math.PI/2,0,0);
scene.add(plane);

renderer.render(scene, camera);
