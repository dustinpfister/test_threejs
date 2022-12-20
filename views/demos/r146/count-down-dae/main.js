(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 1, 2);
    scene.add(dl);
    // ---------- ----------
    // SOURCE_OBJECTS OBJECT that will hold the number objects
    // ---------- ----------
    const SOURCE_OBJECTS = {};
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // what to do for a DAE result object
    const DAELoad = (result) => {
        let i = 0;
        while(i < 10){
            const obj = result.scene.getObjectByName('num_' + i);
            obj.position.set(0, 0, 0);
            SOURCE_OBJECTS[i] = obj;
            i += 1;
        }
    };
    // create a count_sec count down object
    const create_count_sec = ( objects ) => {
        const count_sec = countDown.create({
            countID: 'sec',
            digits: 2,
            width: 1.05,
            source_objects: objects
        });
        count_sec.position.set(0, 1, 0);
        return count_sec;
    };
    // create loop method with given update method
    const create_loop = (update) => {
        const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
        FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
        FRAME_MAX = 800;
        let secs = 0,
        frame = 0,
        lt = new Date();
        // update
        update = update || function(frame, frameMax){};
        // loop
        const loop = function() {
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
        return loop;
    };
    // ---------- ----------
    // LOADING MANAGER
    // ---------- ----------
    const manager = new THREE.LoadingManager();
    manager.onLoad = function(){
        console.log('Done Loading.');
        //-------- ----------
        // SCENE CHILD OBJECTS
        //-------- ----------
        scene.add( new THREE.GridHelper(10, 10) );
        // count secs count down object
        const count_sec = create_count_sec(SOURCE_OBJECTS);
        scene.add(count_sec);
        // ---------- ----------
        // UPDATE / ANIMATION LOOP
        // ---------- ----------
        const update = function(frame, frameMax){
            const a1 = (frame + 1) / frameMax;
            let secs = Math.floor(30 - 30 * a1);
            let a2 = (30 - 30 * a1) % 1;
            let ms = Math.floor(1000 * a2);
            countDown.set(count_sec, secs);
        };
        const loop = create_loop(update);
        loop();
    };
    // ---------- ----------
    // DAE LOADER
    // ---------- ----------
    const loader = new THREE.ColladaLoader(manager);
    loader.load('/dae/count_down_basic/cd1.dae', DAELoad);
}());