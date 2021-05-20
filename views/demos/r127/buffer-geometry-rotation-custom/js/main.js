
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0,
                1, 0, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // MESH with GEOMETRY, and Basic MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));

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
