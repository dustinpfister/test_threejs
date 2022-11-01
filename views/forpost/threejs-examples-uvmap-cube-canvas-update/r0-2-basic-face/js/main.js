(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // CUSTOM DRAW METHOD
    // ---------- ---------- ----------
    // palette grid draw method
    const palette_grid = (canObj, ctx, canvas, state) => {
        const w =  state.w === undefined ? 16 : state.w;
        const h =  state.h === undefined ? 16 : state.h;
        const data = state.data || [];
        const len = w * h;
        const pxW = canObj.size / w;
        const pxH = canObj.size / h;
        let i = 0;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        while(i < len){
            const ci =  data[i] || 0;
            const x = i % w;
            const y = Math.floor(i / w);
            ctx.fillStyle = canObj.palette[ci];

            const px = x * pxW;
            const py = y * pxH;
            ctx.fillRect(px, py, pxW, pxH);
            i += 1;
        }
    };
    // create a canObj with a palette and grid data
    const createGridCanvas = (data, palette, w, h, size) => {
        const canObj = canvasMod.create({
            draw: palette_grid,
            size: size === undefined ? 128: size,
            palette: palette || ['white', 'black', 'red', 'lime', 'blue'],
            state:{
                data: data || [],
                w: w === undefined ? 32: w, 
                h: h === undefined ? 32: h
            }
        });
        //canObj.canvas.style.imageRendering = 'pixelated';
        return canObj;
    };
    const data_smile = [
         2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,1,0,0,1,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,1,0,0,1,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,1,0,0,1,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,1,1,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,

         2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,0,0, 0,0,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,0,0,0, 0,0,0,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,0,0,0,0,0,0, 0,0,0,0,0,0,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,

         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,

         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
    ];


    // ---------- ---------- ----------
    // CREATE AND UPDATE MESH
    // ---------- ---------- ----------
    // create the mesh object
    let mesh = uvMapCube.create({
        images: [
            createGridCanvas(data_smile).canvas

 
            //canvasMod.create({ draw: 'rnd', palette: ['lime', 'green'], size: 128, state:{gSize: 16} } ).canvas,
            //canvasMod.create({ draw: 'rnd', palette: ['red', 'blue', 'purple'], size: 128, state:{gSize: 16} } ).canvas
        ]
    });
    scene.add(mesh);
    // I can now use the draw face method
    uvMapCube.drawFace(mesh, 'front', {i:0, sx: 0, sy: 0, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'back', {i:0, sx: 32, sy: 0, sw: 32, sh: 32});

    uvMapCube.drawFace(mesh, 'right', {i:0, sx: 0, sy: 32, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'left', {i:0, sx: 32, sy: 32, sw: 32, sh: 32});

    uvMapCube.drawFace(mesh, 'top', {i:0, sx: 0, sy: 64, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'bottom', {i:0, sx: 32, sy: 64, sw: 32, sh: 32});

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