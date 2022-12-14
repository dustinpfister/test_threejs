(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(4, 3, 4);
    camera.lookAt(0, 0, 0);
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
    const guy = weirdGuy.create({});
    scene.add(guy);

    const a1 = 0.25;
    weirdGuy.setWalk(guy, a1);


    // trans legs out of a walk cycle
    const transLegsOut = (guy, a1, a2) => {
        const leg1 = guy.getObjectByName('guy1_leg1');
        const leg2 = guy.getObjectByName('guy1_leg2');
        // set from last walk state using a1 alpha
        weirdGuy.setWalk(guy, a1);
        const d1 = 1 - leg1.scale.y;
        const d2 = 1 - leg2.scale.y;
        leg1.scale.y = leg1.scale.y + d1 * a2;
        leg2.scale.y = leg2.scale.y + d2 * a2;
        leg1.position.y = -1 * leg1.scale.y;
        leg2.position.y = -1 * leg2.scale.y;; 
    };

    transLegsOut(guy, a1, 0.80);


        const leg1 = guy.getObjectByName('guy1_leg1');
        const leg2 = guy.getObjectByName('guy1_leg2');
console.log(leg1.scale.y, leg2.scale.y)

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
            bias = 1 - Math.abs(0.5 - per) / 0.5;
            // Set walk will just move the legs
            //weirdGuy.setWalk(guy, bias);
 
            // using set arm method to swing the arms
            //weirdGuy.setArm(guy, 1, -20 + 40 * bias, 0);
            //weirdGuy.setArm(guy, 2, 20 - 40 * bias, 0);
 
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
