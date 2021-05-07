(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);

    var material_override = new THREE.MeshDepthMaterial({
            wireframe: true
        });
    scene.overrideMaterial = material_override;

    // mesh1
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshDepthMaterial());
    scene.add(mesh);

    var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshDepthMaterial());
    mesh2.position.set(-1.5, 0, 0);
    scene.add(mesh2);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.75, 10);
    camera.position.set(1.15, 0.85, 0.75);
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
    time = 0,
    switchTime = 1.0,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            time += secs;
            if (time >= switchTime) {
                if (scene.overrideMaterial) {
                    scene.overrideMaterial = null;
                } else {
                    scene.overrideMaterial = material_override;
                }
                time %= switchTime;
            }
            renderer.render(scene, camera);
            lt = now;
        }
    };

    loop();

}
    ());
