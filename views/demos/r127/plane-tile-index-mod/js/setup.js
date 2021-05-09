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
        color: 0xeffff00,
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        color: 0x2f2f2f,
        side: THREE.DoubleSide
    })
];

var plane = TileMod.create({
        materials: materialArray,
        w: 10,
        h: 10,
        sw: 4,
        sh: 4
    });
// set checkerBoard material index values
TileMod.setCheckerBoard(plane);
scene.add(plane);

var plane2 = TileMod.create({
        materials: materialArray,
        w: 10,
        h: 10,
        sw: 8,
        sh: 8
    });
// set checkerBoard material index values
TileMod.setBoxBoard(plane2);
plane.position.set(-11, 0, 0);
scene.add(plane2);

renderer.render(scene, camera);
