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
    dl.position.set(3, 1.0, 0.5);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(al);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy.create({});
    scene.add(guy);
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
        if(state.c >= 90){
            state.mode = 'walk_trans_out';
            state.c = 0;
        }
    };
    state.walk_trans_out = function(state){
        const a1 = state.n / state.d;
        const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
        weirdGuy.transLegs(guy, a2, state.c / 30);
        state.c += 1;
        if(state.c >= 30){
            state.mode = 'rest';
            state.c = 0;
        }
    };
    state.rest = function(state){
        weirdGuy.transLegs(guy, 0, 1);
        state.c += 1;
        if(state.c >= 90){
            state.mode = 'walk_trans_in';
            state.c = 0;
        }
    };
    state.walk_trans_in = function(state){
        const a1 = state.n / state.d;
        const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
        weirdGuy.transLegs(guy, a2, 1 - state.c / 30);
        state.c += 1;
        if(state.c >= 30){
            state.mode = 'walk';
            state.c = 0;
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
