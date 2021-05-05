
(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    // Something to look at
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()));

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // FLY CONTROLS the camera is given as the first argument, and 
    // the DOM element must now be given as a second argument
    var controls = new THREE.FlyControls(camera, renderer.domElement);

    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        // UPDATE CONTROLS
        controls.update(0.25);
        renderer.render(scene, camera);
    };

    loop();

}
    ());
