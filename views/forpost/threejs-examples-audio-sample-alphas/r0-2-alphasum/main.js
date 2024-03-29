(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(6, 6, 12);
    camera.lookAt(0, -1, 0);
    camera.zoom = 2;
    camera.updateProjectionMatrix();
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // get sum array helper
    const getSumArray = (result, key) => {
        const sampleObj = result[key];
        const alphas = sampleObj.abs;
        const sum_up = [];
        let i = 0;
        const len = alphas.length;
        while(i < len){
            const a1 = alphas[i] / sampleObj.maxABS;
            let a2 = 0;
            if(i > 0){
               a2 = sum_up[ i - 1];
            }
            sum_up.push(a1 + a2);
            i += 1;
        }
        return sum_up;
    };
    // ---------- ----------
    // STATE
    // ---------- ----------
    const state = {
       result: null
    };
    // ---------- ----------
    // OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper( 20, 20 ) );
    const box1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(box1);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = state.sum_array[ Math.round( ( state.sum_array.length - 1 ) * a1) ] / state.sum_max;
        const a3 = 0.25 * a1 + 0.75 * a2;
        box1.position.set(-10 + 20 * a3,0,0);
        camera.lookAt(box1.position);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    // ---------- ----------
    // LOADER
    // ---------- ----------
    sampleAlpha.load({
        URLS_BASE: '/demos/r146/get-audio-alphas/sample-data/',
        URLS: [
           'glavin.html',
           'bv_006_bass.html',
           'bv_006_drums.html' ]
    })
    .then((result) => {
        state.result = result;
        state.sum_array = getSumArray(result, 'bv_006_drums');
        state.sum_max = state.sum_array[ state.sum_array.length - 1];
        loop();
    });
}());