(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1, 3, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // createing custom objects using canvas.js r2
    const SOURCE_OBJECTS = {};
    let i = 0;
    while(i < 10){
        SOURCE_OBJECTS[i] = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
               color: new THREE.Color(i / 10, 0,0)
            })
        );
        i += 1;
    }
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    // seconds
    const count_sec = countDown.create({
        countID: 'sec',
        digits: 2,
        width: 1.25,
        source_objects: SOURCE_OBJECTS
    });
    count_sec.position.set(-1, 0, 0);
    scene.add(count_sec);
    const count_ms = countDown.create({
        countID: 'ms',
        digits: 3,
        width: 1.15,
        source_objects: SOURCE_OBJECTS
    });
    count_ms.scale.set(0.5, 0.5, 0.5);
    count_ms.position.set(1.25, 0, 0.5);
    scene.add(count_ms);
    // frame counter
    const count_frames = countDown.create({
        countID: 'frames',
        digits: 3,
        width: 1.25,
        source_objects: SOURCE_OBJECTS
    });
    count_frames.position.set(-3.5,0,-5);
    scene.add(count_frames);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 900;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = (frame + 1) / frameMax;
        let secs = Math.floor(30 - 30 * a1);
        let a2 = (30 - 30 * a1) % 1;
        let ms = Math.floor(1000 * a2);
        //const timeStr = String(secs).padStart(3, '0');
        countDown.set(count_sec, secs);
        countDown.set(count_ms, ms);
        countDown.set(count_frames, frame);
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
    // what to do for a DAE result object
    const DAELoad = (result) => {
        console.log(result)
    };
    // I will want a manager for this to start loop when
    // all DAE files are loaded
    var manager = new THREE.LoadingManager();
    manager.onLoad = function(){
        console.log('All Load.');
        loop();
    };
    // the collada loader instance
    var loader = new THREE.ColladaLoader(manager);
    loader.load('/dae/box_house_1/box_house1.dae', DAELoad);
    loader.load('/dae/rpi4/rpi4_start_box.dae', DAELoad);

    
}());