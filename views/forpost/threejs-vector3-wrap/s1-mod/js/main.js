(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh1.position.set(0, 0, -3);
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh2.position.set(0, 0, -2);
    scene.add(mesh2);
    var mesh3 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh3.position.set(0, 0, 2);
    scene.add(mesh3);
    var mesh4 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh4.position.set(0, 0, 3);
    scene.add(mesh4);
    //-------- ----------
    // LOOP
    //-------- ----------
    var frame = 0,
    maxFrame = 300,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            mesh1.position.x -= 5 * secs;
            mesh1.position.x %= 5;
            mesh2.position.x += 5 * secs;
            mesh2.position.x %= 5;
            mesh3.position.x -= 5 * secs;
            mesh3.position.x = THREE.MathUtils.euclideanModulo(mesh3.position.x, 5);
            mesh4.position.x += 5 * secs;
            mesh4.position.x = THREE.MathUtils.euclideanModulo(mesh4.position.x, 5);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());