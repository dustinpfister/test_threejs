(function () {
    // ---------- ----------
    // ADD POINT LIGHT HELPERS
    // ---------- ----------
    var addPointLight = function (scene, color, x, y, z) {
        var pointLight = new THREE.PointLight(color);
        pointLight.position.set(x, y, z);
        pointLight.add(new THREE.Mesh(
                new THREE.SphereGeometry(1, 10, 10),
                new THREE.MeshBasicMaterial({
                    color: color
                })));
        scene.add(pointLight);
        return pointLight;
    };
    // create some cubes
    var addCube = function (scene, size, x, y, z) {
        var geometry = new THREE.BoxGeometry(size, size, size),
        material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0x0f0f0f
            });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);
    };
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f1f1f);
    var gridHelper = new THREE.GridHelper(40, 10);
    scene.add(gridHelper);
    // create some point lights and add it to the scene
    var whitePointLight = addPointLight(scene, 0xffffff, 0, 0, 0),
    redPointLight = addPointLight(scene, 0xff0000, 30, 0, 0),
    greenPointLight = addPointLight(scene, 0x00ff00, 0, 30, 0),
    bluePointLight = addPointLight(scene, 0x0000ff, 0, 0, 30);
    // create some cubes
    addCube(scene, 10, 15, 0, 0);
    addCube(scene, 10, -15, 0, 0);
    addCube(scene, 10, 0, 0, 15);
    addCube(scene, 10, 0, 0, -15);
    // need a camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
    camera.position.set(37, 37, 37);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // loop
    // ---------- ----------
    var frame = 0,
    maxFrame = 180,
    lt = new Date(),
    fps = 30,
    per,
    bias,
    loop = function () {
        requestAnimationFrame(loop);
        var r = Math.PI * 2 * per,
        sin = Math.sin(r) * 30,
        cos = Math.cos(r) * 30,
        now = new Date(),
        secs = (now - lt) / 1000;
        per = frame / maxFrame;
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        if (secs > 1 / fps) {
            // update point lights
            whitePointLight.position.y = 20 * bias;
            redPointLight.position.set(cos, sin, 0);
            greenPointLight.position.set(cos, 0, sin);
            bluePointLight.position.set(0, cos, sin);
            // render
            renderer.render(scene, camera);
            lt = new Date();
            // step frame
            frame += fps * secs;
            frame %= maxFrame;
        }
    };
    loop();
}
    ());
