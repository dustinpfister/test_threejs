

(function () {

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);

    // add something to the scene
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
                color: 0xff0000
            }));
    scene.add(cube);

    // render the scene with the camera
    var frame = 0,
    frameMax = 50;

    var loop = function () {

        requestAnimationFrame(loop);

        var per = frame / frameMax,
        a = Math.PI * 2 * per;

        cube.rotation.y = a;

        renderer.render(scene, camera);

        frame += 1;
        frame %= frameMax;

    };

    loop();

}
    ());
