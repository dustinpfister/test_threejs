(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // ADD A MESH
    // ---------- ---------- ----------
    // create the mesh object
    let mesh = uvMapCube.create({
        images: [ 
            canvasMod.create({ draw: 'rnd', palette: ['lime', 'green'], size: 128, state:{gSize: 16} } ).canvas,
            canvasMod.create({ draw: 'rnd', palette: ['red', 'blue', 'purple'], size: 128, state:{gSize: 16} } ).canvas
        ]
    });
    scene.add(mesh);
    // I can now use the draw face method
    uvMapCube.drawFace(mesh, 'front', {i:1, sx: 0, sy: 0, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'back', {i:1, sx: 0, sy: 0, sw: 16, sh: 64});
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
//        const degree = 360 * (frame / frameMax);
//        mesh.rotation.x = THREE.MathUtils.degToRad(degree);
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
    loop();
}());