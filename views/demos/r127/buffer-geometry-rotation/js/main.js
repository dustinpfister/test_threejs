
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // GEOMETRY
    var geometry = new THREE.ConeGeometry(1, 3, 30, 30);
    // MESH with GEOMETRY, and Basic MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());

    // add custom to the scene
    scene.add(custom);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);

    // RENDER
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
