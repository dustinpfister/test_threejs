
(function () {
    // scene
    var scene = new THREE.Scene();

    // THE MESH
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);

    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
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
