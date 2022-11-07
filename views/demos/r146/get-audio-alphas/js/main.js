(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 4, 5);
    camera.lookAt(0, 1, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // STATE
    // ---------- ----------
    const state = {
       result: null
    };
    // ---------- ----------
    // OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper( 10,10 ) );
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(box);
    const box_bass = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box_bass.position.set(-3, 0, -1);
    scene.add(box_bass);
    const box_drums = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box_drums.position.set(-5, 0, -1);
    scene.add(box_drums);
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
        const a2 = sampleAlpha.getByAlpha(state.result, 'bv_006_bass', a1);
        const a3 = sampleAlpha.getByAlpha(state.result, 'bv_006_drums', a1);
        const s = 0.25 + 1.75 * a2;
        box.scale.set(s, s, s);
        box.position.y = s / 2 + s * a3;
        box.rotation.set(
            Math.PI * 2 * Math.random() * a3,
            Math.PI * 2 * Math.random() * a3,
            Math.PI * 2 * Math.random() * a3
        )
        
        box_bass.scale.set(1, 0.1 + a2 * 2.9, 1);
        box_bass.position.y = a2 * 3 / 2;
        box_drums.scale.set(1, 0.1 + a3 * 2.9, 1);
        box_drums.position.y = a3 * 3 / 2;
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
        console.log( sampleAlpha.getArray( result, 'glavin', 10) );
        console.log( sampleAlpha.getArray( result, 'bv_006_bass', 10) );
        console.log( sampleAlpha.getArray( result, 'bv_006_drums', 10) );
        loop();
    });
}());