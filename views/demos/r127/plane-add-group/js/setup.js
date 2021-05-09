// An Array of materials
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

// PLANE
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 1, 2),
        materialArray);
// USING ADD GROUP METHOD TO SET MATERIAL
// INDEX VLAUES
plane.geometry.addGroup(0, 6, 0);
plane.geometry.addGroup(6, 6, 1);

plane.position.set(0, 0, 0);
plane.rotation.set(-Math.PI * 0.5, 0, 0);

// add plane to scene
var scene = new THREE.Scene();
scene.add(plane);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(3.5, 5.5, 3.5);
camera.lookAt(0, -1.5, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
