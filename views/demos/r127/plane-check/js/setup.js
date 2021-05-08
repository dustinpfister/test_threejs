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
        new THREE.PlaneGeometry(5, 5, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide
        }));
plane.position.set(-10, 0, 0);
plane.rotation.set(-Math.PI * 0.5, 0, 0);
scene.add(plane);

// standard checker
var check = mkChecker({
        w: 5,
        h: 5
    });
scene.add(check);

renderer.render(scene, camera);
