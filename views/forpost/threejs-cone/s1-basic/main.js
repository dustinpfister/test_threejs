(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    // CONE
    var coneGeo = new THREE.ConeGeometry(1, 7),
    coneMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }),
    cone = new THREE.Mesh(coneGeo, coneMaterial);
    // add cone to the scene
    scene.add(cone);
    // render
    renderer.render(scene, camera);
}
    ());