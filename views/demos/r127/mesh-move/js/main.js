
(function () {

    // Scene
    var scene = new THREE.Scene();

    // The Mesh
    // assigning it to a variable so I can work
    // with it elsewhere
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial());
    scene.add(mesh);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(3, 1, 3);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var frame = 0,
    maxFrame = 50,
    loop = function () {

        var per = frame / maxFrame,
        r = Math.PI * 2 * per;

        requestAnimationFrame(loop);

        // move the mesh with Object3D.position
        mesh.position.x = Math.cos(r) * 2;
        mesh.position.z = Math.sin(r) * 2;

        // a Object3D method
        mesh.lookAt(0, 0, 0);

        // render the scene with the camera
        renderer.render(scene, camera);

        frame += 1;
        frame %= maxFrame;
    }

    loop();

}
    ());
