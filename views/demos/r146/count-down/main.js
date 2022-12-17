(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
/*
    const createTimeGroup = (str_time) => {
        str_time = str_time || '00:00:00';
        const timeGroup = new THREE.Group();
        str_time.split('').forEach((char, i, arr) => {
            const canObj = canvasMod.create({
                size: 32,
                update_mode: 'canvas',
                palette: ['black', 'white'],
                state: {
                   char: char,
                },
                draw: drawNumber
            });
            canvasMod.update(canObj);
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
                map: canObj.texture
            }));
            mesh.userData.canObj = canObj;
            const a_charpos = i / arr.length;
            mesh.position.x = -0.6 + 2.4 * a_charpos;
            mesh.position.y = 0.5;
            timeGroup.add(mesh);
        });
        return timeGroup;
    };
    // update time group helper
    const updateTimeGroup = (timeGroup, str_time) => {
        str_time = str_time || '00:00:00';
        timeGroup.children.forEach((mesh, i, arr) => {
            const canObj = mesh.userData.canObj;
            const char = str_time[i];
            canObj.state.char = char;
            canvasMod.update(canObj);
        });
    };
    //-------- ----------
    // CANVAS OBJ
    //-------- ----------
    const drawNumber = (canObj, ctx, canvas, state) => {
        ctx.fillStyle = canObj.palette[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = canObj.palette[1];
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '16px arial';
        ctx.fillText(state.char, 16, 16);
    };
*/
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );

    const count_sec = countDown.create({ countID: 'sec', timeStr:'09'});
    scene.add(count_sec);

    // create and add the time group
    //const timeGroup = createTimeGroup('00');
    //timeGroup.scale.set(2,4,1)
    //scene.add(timeGroup);
    //updateTimeGroup(timeGroup, '30');
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 900;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        let secs = Math.floor(30 - 30 * a1);

        const timeStr = String(secs).padStart(2, '0');
        countDown.set(count_sec, timeStr);

        //updateTimeGroup(timeGroup, );
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