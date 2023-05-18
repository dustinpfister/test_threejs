(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1.4, 2.8);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // Something to look at
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial()));
    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // loop
    camera.position.set(1.3, 1.5, 1.3);
    camera.lookAt(0, 0, 0);
    var loop = function () {
        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);
    };
    loop();
}
    ());