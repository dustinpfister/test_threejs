(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0000ff);

    // mesh1
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: 0xffffff, // color is white
                emissive: 0x0000ff, // emissive color is the same as the background color
                wireframe: true
            }));
    scene.add(mesh);

    var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: 0xffffff, // color is white
                emissive: 0x000000, // emissive color is Black
                wireframe: true
            }));
    mesh2.position.set(-1.5, 0, 0);
    scene.add(mesh2);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    camera.add(light)
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var lt = new Date(),
    deg = 0,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            deg += 10 * secs;
            deg %= 30;
            var per = deg / 30,
            radian = Math.PI * 2 * per,
            bias = 1 - Math.abs(per - 0.5) / 0.5;
            light.position.set(Math.cos(radian) * 2, Math.sin(radian) * 2, 0);
            light.intensity = 1 * bias;
            renderer.render(scene, camera);
            lt = now;
        }
    };

    loop();

}
    ());
