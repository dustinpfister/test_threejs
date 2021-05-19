(function () {

    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));

    var tree = TreeSphereMod.create({
            sphereSize: 1,
            trunkLength: 4
        });
    tree.add(new THREE.BoxHelper(tree));
    scene.add(tree);

    // camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(tree.position);

    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    //renderer.width = 640;
    renderer.domElement.width = 640;
    renderer.domElement.height = 480;
    renderer.setViewport(0, 0, 640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);

    var lt = new Date(),
    sunRadian = Math.PI,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
