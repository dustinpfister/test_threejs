
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(6, 6));

    // mesh
    var mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 30, 30),
            new THREE.MeshNormalMaterial());

    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(1, 0, 1);
    scene.add(mesh);

    console.log(mesh.position.clone().round()); // {x: -1, y: 0, z: -1}

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var degree = 0,
    v,
    lt = new Date(),
    fps = 30;
    var update = function (secs) {
        v = new THREE.Vector3(0, 1, 0);
        degree = 45 * secs;
        mesh.position.applyAxisAngle(v, Math.PI / 180 * degree);
    };
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
