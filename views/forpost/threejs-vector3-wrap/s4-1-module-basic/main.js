(function () {
    // works well with Vector2
    var v = new THREE.Vector2(5, 2);
    console.log( wrapVector( v , new THREE.Vector2(-3, -3), new THREE.Vector2(3, 3) ) );
    //-------- ----------
    // SCENE, CAMERA RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
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
    mesh1.position.set(0, 0, 0);
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh2.position.set(0, 0, -1.5);
    scene.add(mesh2);
    //-------- ----------
    // LOOP
    //-------- ----------
    var vMin = new THREE.Vector3(-2, -1, -2),
    vMax  = new THREE.Vector3(2, 1, 2);
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
            // warp one axis
            mesh1.position.x += (-5 + 10 * bias) * secs;
            mesh2.position.y += (-5 + 10 * bias) * secs;
            // wrap vector
            wrapVector(mesh1.position, vMin, vMax);
            wrapVector(mesh2.position, vMin, vMax);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
