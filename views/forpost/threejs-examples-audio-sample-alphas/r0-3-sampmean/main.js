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
    // get a sample alpha by a given sample index and a backCount that is
    // the max number of samples back to go to create a mean to use.
    const getByIndexMean = (result, key, csi, backCount) => {
        backCount = backCount === undefined ? 3 : backCount;
        const sampleObj = result[key];
        // current sample index
        const bsi = csi - backCount;
        // by default just use the
        let samples = [];
        // if csi is bellow backCount
        if(bsi < 0){
            samples = sampleObj.abs.slice( 0, csi + 1 );
        }
        // we have at least the back count
        if(bsi >= 0){
            samples = sampleObj.abs.slice( bsi + 1, csi + 1 );
        }
        let absNum = 0; //sampleObj.abs[ csi ];
        const sampCount = samples.length;
        if(sampCount > 0){
            const sum = samples.reduce((acc, n) => { return acc + n;  }, 0);
            absNum = sum / sampCount;
        }
        const alphaSamp = absNum / sampleObj.maxABS;
        return alphaSamp;
    };
    // get a sample alpha by a given alpha value and a backCount that is
    // the max number of samples back to go to create a mean to use.
    const getByAlphaMean = (result, key, alpha, backCount) => {
        const sampleObj = result[key];
        const csi = Math.round( ( sampleObj.abs.length - 1) * alpha);
        return getByIndexMean(result, key, csi, backCount);
    };
    // make a mesh helper
    const makeMesh = (x, y, z, color) => {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshPhongMaterial({ color: color }));
        mesh.position.set(x, y, z);
        return mesh;
    };
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 2, 3)
    scene.add(dl);
    // ---------- ----------
    // STATE
    // ---------- ----------
    const state = {
       result: null
    };
    // ---------- ----------
    // OBJECTS
    // ---------- ----------
    // for the build in getByAlpha method that is limited to just one sample to create the alpha
    scene.add( new THREE.GridHelper( 20, 20 ) );
    const mesh1 = makeMesh(-2, 0, -2, new THREE.Color( 1, 0, 0) );
    scene.add(mesh1);
    const mesh2 = makeMesh(-2, 0, 2, new THREE.Color( 1, 0, 0) );
    scene.add(mesh2);
    // for the getByAlphaMean method
    const mesh3 = makeMesh(2, 0, -2, new THREE.Color( 0, 1, 0) );
    scene.add(mesh3);
    const mesh4 = makeMesh(2, 0, 2, new THREE.Color( 0, 1, 0) );
    scene.add(mesh4);
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
        const a2 = sampleAlpha.getByAlpha(state.result, 'bv_006_drums', a1);
        const a3 = getByAlphaMean(state.result, 'bv_006_drums', a1, 5);
        const a4 = sampleAlpha.getByAlpha(state.result, 'bv_006_bass', a1);
        const a5 = getByAlphaMean(state.result, 'bv_006_bass', a1, 5);
        const s1 = 0.1 + 0.9 * a2;
        mesh1.scale.set(1, s1, 1);
        const s2 = 0.1 + 0.9 * a4;
        mesh2.scale.set(1, s2, 1);
        const s3 = 0.1 + 0.9 * a3;
        mesh3.scale.set(1, s3, 1);
        const s4 = 0.1 + 0.9 * a5;
        mesh4.scale.set(1, s4, 1);
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
           'bv_006_drums.html', 'bv_006_bass.html']
    })
    .then((result) => {
        state.result = result;
        loop();
    });
}());