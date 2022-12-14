(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 1.75, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(0.1, 1.0, 0);
    scene.add(dl);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy.create({
    });


    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy.setWalk(guy, 0);


    weirdGuy.setArm(guy, 1, 45, 700);

    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let frame = 0,
    lt = new Date();
    const maxFrame = 60;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            const per = frame / maxFrame * 5 % 1,
            bias = Math.abs(0.5 - per) / 0.5;
            // walk
            weirdGuy.setWalk(guy, bias);

            // arms
            //const arm1 = guy.getObjectByName(guy.name + '_arm1'),
            //arm2 = guy.getObjectByName(guy.name + '_arm2');
            //arm1.rotation.x = Math.PI / 180 * (180 - 20 + 40 * bias);
            //arm2.rotation.x = Math.PI / 180 * (180 + 20 - 40 * bias);

            // rotate
            const per2 = frame / maxFrame * 1 % 1,
            bias2 = Math.abs(0.5 - per2) / 0.5;
            guy.rotation.y = -0.5 + 2.5 * bias2;
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
