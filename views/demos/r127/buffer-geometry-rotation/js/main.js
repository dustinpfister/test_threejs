
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene

    // geometry
    var geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
    // Mesh
    var cone = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());
    // adding a box helper
    cone.add(new THREE.BoxHelper(cone));

    // add custom to the scene
    scene.add(cone);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(5, 5, 5);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}
    ());
