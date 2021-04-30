
(function () {
    // Scene
    var scene = new THREE.Scene();
    // ADDING BACKGROUND AND FOG
    fogColor = new THREE.Color(0x00af00);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.5);

    // A Material that DOES SUPPORT FOG
    // being use in a Mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x080808
            }));
    scene.add(mesh);

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight(0xffffff));
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Loop
    var frame = 0,
    maxFrame = 500,
    target_fps = 30;
    lt = new Date();
    var loop = function () {
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / target_fps) {
            mesh.position.z = 1 + 4 * bias;
            mesh.rotation.x = Math.PI * 2 * 4 * per;
            mesh.rotation.y = Math.PI * 2 * 2 * per;
            camera.lookAt(mesh.position);
            renderer.render(scene, camera);
            frame += target_fps * secs;
            frame = frame % maxFrame;
            lt = now;
        }
    };

    loop();
}
    ());
