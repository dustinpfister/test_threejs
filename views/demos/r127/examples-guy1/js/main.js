(function () {

    // SCENE
    var scene = new THREE.Scene();

    // GUY Instances
    var guy1 = new Guy();
    scene.add(guy1.group);
    var guy2 = new Guy();
    guy2.group.position.set(5, 0, 0);
    scene.add(guy2.group);
    var guy3 = new Guy();
    guy3.group.position.set(-5, 0, 0);
    scene.add(guy3.group);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var frame = 0,
    maxFrame = 200,
    lt = new Date();
    var loop = function () {

        var now = new Date(),
        secs = (now - lt) / 1000;

        requestAnimationFrame(loop);

        if (secs > 0.05) {
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = Math.PI * 2 * per;

            // guy1 walks around, and moves head
            guy1.walk(per, 8);
            guy1.moveHead(.25 - .25 * bias);
            guy1.group.position.set(
                Math.cos(r) * 5 - 5,
                0,
                Math.sin(r) * 5);
            guy1.group.lookAt(
                Math.cos(r + 0.5) * 5 - 5,
                0,
                Math.sin(r + 0.5) * 5);
            // guy 2 shakes his head
            guy2.moveHead(.125 - .25 * bias);
            // guy 3 just moves arms
            guy3.moveArm('arm_right', 0, bias * 2);
            guy3.moveArm('arm_left', 0, bias * 2);

            // draw
            renderer.render(scene, camera);

            frame += 30 * secs;
            frame %= maxFrame;

            lt = now;
        }

    };

    loop();

}
    ());
