

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-3, 4, 3);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);

    // CONE
    var cone = new THREE.ConeGeometry(1, 5, 4, 1, false, 0, Math.PI),
    matreial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        }),
    mesh = new THREE.Mesh(cone, matreial);
    scene.add(mesh);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
