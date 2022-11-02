(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 1.25, 0);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 2, 3);
    scene.add(dl)
    // ---------- ----------
    // APP LOOP
    // ---------- ----------
    const state = {
        mesh: null
    };
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const alpha = frame / frameMax;
        const bias = 1 - Math.abs(0.5 - alpha) / 0.5;
        // animate face
        const cx = Math.floor(3.99 * bias);
        drawCell(state.mesh, 'front', 1, cx, 0);
        const d = -45 + 90 * bias;;
        state.mesh.rotation.y = Math.PI / 180 * d;
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
    // draw cell helper
    const drawCell = (mesh, drawto, i, x, y, size) => {
        i = i === undefined ? 0: i;
        x = x === undefined ? 0: x;
        y = y === undefined ? 0: y;
        size = size === undefined ? 32: size;
        uvMapCube.drawFace(mesh, drawto, {i:i, sx: x * size, sy: y * size, sw: size, sh: size});
    };
    // ---------- ---------- ----------
    // USING LIST LOADER r0
    // ---------- ---------- ----------
    textureMod.load({
        URLS_BASE: '/img/smile-face/',
        URLS: ['smile_sheet_128.png', 'smile_creepy_128.png']
    })
    // then if all goes well
    .then( (textureObj) => {
        // ---------- ---------- ----------
        // CREATE AND UPDATE MESH
        // ---------- ---------- ----------
        // create the mesh object
        const mesh = state.mesh = uvMapCube.create({
            pxa: 1.42,
            images: [
                textureObj['smile_sheet_128'].image,
                textureObj['smile_creepy_128'].image
            ]
        });
        mesh.material.emissiveIntensity = 0.15;
        scene.add(mesh);
        drawCell(mesh, 'front', 1, 3, 0);
        drawCell(mesh, 'back', 0, 2, 0);
        drawCell(mesh, 'top', 0, 0, 1);
        drawCell(mesh, 'bottom', 0, 1, 1);
        drawCell(mesh, 'left', 0, 1, 0);
        drawCell(mesh, 'right', 0, 3, 0);
        // ---------- ---------- ----------
        // START THE LOOP
        // ---------- ---------- ----------
        loop()
    })
    // error
    .catch((url)=>{
        console.log('Error when trying to load: ' + url);
    });
}());