
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Using A Mesh
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),

            new THREE.MeshDepthMaterial()));

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        // render the scene with the camera
        renderer.render(scene, camera);

    }

    loop();

}
    ());
