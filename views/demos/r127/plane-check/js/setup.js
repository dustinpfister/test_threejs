var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var materialArray = [
    new THREE.MeshBasicMaterial({
        color: 0xe0e0e0,
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        color: 0x505050,
        side: THREE.DoubleSide
    })
];

// add a plane
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 1, 1),
        materialArray);
plane.geometry.addGroup(0, 6, 0);
plane.position.set(-10, 0, 0);
plane.rotation.set(-Math.PI * 0.5, 0, 0);
scene.add(plane);

// standard checker
var check = mkChecker({
        w: 10,
        h: 10,
        sw: 2,
        sh: 2
    });
scene.add(check);

renderer.render(scene, camera);
