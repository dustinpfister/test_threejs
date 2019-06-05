var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

// add a plane
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 12, 5, 4),
        [
            new THREE.MeshBasicMaterial({
                color: 0xe0e0e0
            }),
            new THREE.MeshBasicMaterial({
                color: 0x505050
            })
        ]);
plane.rotation.set(-Math.PI / 2, 0, 0);

plane.geometry.faces.forEach(function (face, i) {

    console.log( Math.floor( i / 2) % 2)

    if (Math.floor( i / 2 % 2)) {
        face.materialIndex = 1;
    }
});

console.log(plane.geometry)

scene.add(plane);

renderer.render(scene, camera);
