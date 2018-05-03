
(function () {

    // Scene
    var scene = new THREE.Scene();

    // can set a background
    scene.background = new THREE.Color(0xefefef);

    // can set an override material for everything
    scene.overrideMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        });

    // can use Object3d methods on a scene
    scene.position.set(0, 1, 0);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // Something to look at
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1)));

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var frame = 0,
    maxFrame = 50,
    loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
