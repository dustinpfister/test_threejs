
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

    var degree = 0;
    var loop = function () {
        requestAnimationFrame(loop);

        var v = new THREE.Vector3(0, 1, 0);
        mesh.position.applyAxisAngle(v, Math.PI / 180 * 1);
        renderer.render(scene, camera);
    };
    loop();

}
    ());
