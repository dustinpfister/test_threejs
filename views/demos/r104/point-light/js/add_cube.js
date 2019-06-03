// create some cubes
var addCube = function (scene, size, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x0f0f0f
        });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
};