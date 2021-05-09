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


// standard checker
var plane = TileMod.create({
        w: 10,
        h: 10,
        sw: 4,
        sh: 4
    });
// set checkerBoard material index values
TileMod.setCheckerBoard(plane);
// add to plane
scene.add(plane);

renderer.render(scene, camera);
