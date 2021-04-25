(function () {

    // CONE
    var coneGeo = new THREE.ConeGeometry(1, 7),
    coneMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }),
    cone = new THREE.Mesh(coneGeo, coneMaterial);

    // SCENE
    var scene = new THREE.Scene();
    // add cone to the scene
    scene.add(cone);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
