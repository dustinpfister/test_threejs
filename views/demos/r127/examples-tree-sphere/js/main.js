(function () {

    // creating a scene
    var scene = new THREE.Scene();

    var tree = TreeSphereMod.create({
            sphereSize: 0.25 + 0.75 * Math.random(),
            trunkLength: 1 + 4 * Math.random()
        });
    scene.add(tree);

    // camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(12, 12, 12);
    camera.lookAt(0, 0, 0);

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
            //WorldMod.update(world, secs);
            //WorldMod.update(world2, secs);
            //WorldMod.update(world3, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
