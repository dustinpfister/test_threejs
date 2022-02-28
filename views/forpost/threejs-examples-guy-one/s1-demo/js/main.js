(function () {
    // ********** **********
    // SCENE, CAMERA, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(28, 7) );
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    var renderer = new THREE.WebGLRenderer();
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // ADDING GUY OBJECTS TO SCENE
    // ********** **********
    var guy1 = new Guy();
    guy1.group.position.set(0, 3, 0)
    scene.add(guy1.group);
    var guy2 = new Guy();
    guy2.group.position.set(5, 3, 0);
    scene.add(guy2.group);
    var guy3 = new Guy();
    guy3.group.position.set(-5, 3, 0);
    scene.add(guy3.group);
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
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
                3,
                Math.sin(r) * 5);
            guy1.group.lookAt(
                Math.cos(r + 0.5) * 5 - 5,
                3,
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
