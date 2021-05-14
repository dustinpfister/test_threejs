
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));

    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
    camera.position.set(9, 12, 9);
    camera.lookAt(box.position);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
