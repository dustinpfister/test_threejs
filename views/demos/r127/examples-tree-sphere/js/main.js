(function () {

    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));

    // creating a tree
    var tree = TreeSphereMod.create({
            sphereSize: 1,
            trunkLength: 4
        });
    tree.add(new THREE.BoxHelper(tree));
    tree.position.set(0, 2, 0);

    tree.lookAt(0, -10, 0);
    scene.add(tree);

    var sun = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshBasicMaterial());
    sun.add(new THREE.PointLight(0xffff00, 1));
    sun.position.set(3, 3, -2);
    scene.add(sun);

    // camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(5, 8, 5);
    camera.lookAt(tree.position);

    // RENDERER
    var renderer = new THREE.WebGLRenderer();
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
            sunRadian += Math.PI / 180 * 45 * secs;
            sunRadian %= Math.PI * 2;
            sun.position.set(Math.cos(sunRadian) * 3, 4, Math.sin(sunRadian) * 3);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
