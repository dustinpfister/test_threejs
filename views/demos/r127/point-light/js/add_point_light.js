var addPointLight = function (scene, color, x, y, z) {
    var pointLight = new THREE.PointLight(color);
    pointLight.position.set(x, y, z);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: color
            })));
    scene.add(pointLight);
    return pointLight;
};