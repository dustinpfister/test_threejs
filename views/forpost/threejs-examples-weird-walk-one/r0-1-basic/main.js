(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    //scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 1.75, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(0.1, 1.0, 0);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // WEIRD GUY INSTANCE
    // ********** **********
    var guy = weirdGuy.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy.setWalk(guy, 0);
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 60,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            var per = frame / maxFrame * 5 % 1,
            bias = Math.abs(0.5 - per) / 0.5;

            weirdGuy.setWalk(guy, bias);

            var arm1 = guy.getObjectByName(guy.name + '_arm1'),
            arm2 = guy.getObjectByName(guy.name + '_arm2');
            arm1.rotation.x = Math.PI / 180 * (180 - 20 + 40 * bias);
            arm2.rotation.x = Math.PI / 180 * (180 + 20 - 40 * bias);


            var per = frame / maxFrame * 1 % 1,
            bias = Math.abs(0.5 - per) / 0.5;
            guy.rotation.y = -0.5 + 2.5 * bias;

            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
	

}
    ());
