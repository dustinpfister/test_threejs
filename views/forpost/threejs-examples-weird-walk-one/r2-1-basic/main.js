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
    const transLegs = (guy, a_walkstart, a2) => {
        const leg1 = guy.getObjectByName('guy1_leg1');
        const leg2 = guy.getObjectByName('guy1_leg2');
        // set from last walk state using a1 alpha
        weirdGuy.setWalk(guy, a_walkstart);
        const d1 = 1 - leg1.scale.y;
        const d2 = 1 - leg2.scale.y;
        leg1.scale.y = leg1.scale.y + d1 * a2;
        leg2.scale.y = leg2.scale.y + d2 * a2;
        leg1.position.y = -1 * leg1.scale.y;
        leg2.position.y = -1 * leg2.scale.y;; 
    };

    transLegs(guy, 0.25, 0);


    //-------- ----------
    // STATE
    //-------- ----------
    const state = {
       mode: 'walk',
       n: 0, d: 80, // used to get walk alpha
       c: 0
    };
    // walk update method
    state.walk = function(state){
        const a1 = state.n / state.d;
        const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;

        weirdGuy.setWalk(guy, a2);

        state.n += 1;
        state.n %= state.d;
        state.c += 1;

        if(state.c >= 30){
            state.mode = 'walk_trans_out'
            state.c = 0;
        }

    };
    state.walk_trans_out = function(state){
        const a1 = state.n / state.d;
        const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;

        transLegs(guy, a2, state.c / 30);
        state.c += 1;
        if(state.c >= 30){
            state.c = 30;
        }
    };
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let lt = new Date();
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {

            state[state.mode](state);

            //const per = frame / maxFrame * 5 % 1,
            //bias = 1 - Math.abs(0.5 - per) / 0.5;
            // Set walk will just move the legs
            //weirdGuy.setWalk(guy, bias);
 
            // using set arm method to swing the arms
            //weirdGuy.setArm(guy, 1, -20 + 40 * bias, 0);
            //weirdGuy.setArm(guy, 2, 20 - 40 * bias, 0);
 
            // draw
            renderer.render(scene, camera);
            //frame += 20 * secs;
            //frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
