
(function () {
    // Scene
    var scene = new THREE.Scene();

    // CREATEING AND ADDING A MESH TO A SCENE
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial()));

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());
