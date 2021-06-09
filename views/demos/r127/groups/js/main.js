
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 50);
    camera.position.set(10, 10, 10);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0, 0, 0);

    var group = new THREE.Group();

    var i = 0,
    count = 5;
    while (i < count) {

        var bx = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    wireframe: true
                })),

        r = Math.PI * 2 / count * i;

        bx.position.set(

            Math.cos(r) * 4,
            0,
            Math.sin(r) * 4);

        bx.lookAt(0, 0, 0);
        group.add(bx);

        i += 1;
    }

    scene.add(group);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var frame = 0,
    maxFrame = 1000;
    var loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

        group.rotation.set(
            Math.PI * 2 * per,
            Math.PI * 16 * per,
            0);

        frame += 1;
        frame = frame % maxFrame;

    };

    renderer.render(scene, camera);
    loop();

}
    ());
