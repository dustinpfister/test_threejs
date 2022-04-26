(function () {
    // SCENE, CAMERA, RENDERER, CONTROLS
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    camera.position.set(7, 2, 7);
    camera.add(new THREE.PointLight());
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo') || document.body;
    container.appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // WHEEL
    var wheel = WheelMod.create(); //new HamsterWheel();
    wheel.group.position.set(0, 0, 1);
    scene.add(wheel.group);
    // GUY
    var guy = GuyMod.create(); //new Guy();
    guy.group.scale.set(0.5, 0.5, 0.5);
    guy.group.position.set(0,  - .4, 0);
    guy.group.rotation.set(0, Math.PI / 2, 0)
    scene.add(guy.group);
    // GROUND
    var texture_ground = utils.seededRandom(10,10);
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 30, 8, 8),
            new THREE.MeshBasicMaterial({
                map: texture_ground,
                color: 0x00ff00
            }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.9;
    scene.add(plane);
    // LOOP
    var frame = 0,
    maxFrame = 200,
    fps_target = 24,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs >= 1 / fps_target) {
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = -Math.PI * 2 * per;
            wheel.wheel.rotation.z = r;
            GuyMod.walk(guy, per * 4);
            GuyMod.moveHead(guy, 0.8 + 0.2 * bias);
            controls.update();
            renderer.render(scene, camera);
            frame += 1;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
