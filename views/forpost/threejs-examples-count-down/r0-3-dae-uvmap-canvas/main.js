// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0.8, 0.8);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1.5, 2.5, 4.0);
camera.lookAt(0, 0.85, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 1, 2);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(al);
// ---------- ----------
// TEXTURE
// ---------- ----------
const canObj = canvasMod.create({
    size: 512,
    draw: 'rnd',
    palette: [
        '#ffffff', '#eeeeee', '#dddddd', '#cccccc',
        '#bbbbbb', '#aaaaaa', '#999999', '#888888'
    ],
    state: { gSize: 64 }
});
// ---------- ----------
// SOURCE_OBJECTS OBJECT that will hold the number objects
// ---------- ----------
const SOURCE_OBJECTS = {};
// ---------- ----------
// HELPERS
// ---------- ----------
// what to do for a DAE result object
const DAE_on_loaded_item = (result) => {
    let i = 0;
    while(i < 10){
        const obj = result.scene.getObjectByName('num_' + i);
        // using a single texture
        obj.material.map = canObj.texture;
        obj.position.set(0, 0, 0);
        // adding line
        const material_line = new THREE.LineBasicMaterial({
            color: 0xffffff, 
            linewidth: 4,
            transparent: true, opacity: 1
        });
        const line = new THREE.LineSegments( new THREE.EdgesGeometry(obj.geometry), material_line );
        obj.add(line);
        line.scale.set(1.02,1.02,1.02);
        SOURCE_OBJECTS[i] = obj;
        i += 1;
    }
};
// create a count_sec count down object
const create_count_sec = ( objects ) => {
    const count_sec = countDown.create({
        countID: 'sec',
        digits: 2,
        width: 1.1,
        source_objects: objects
    });
    count_sec.position.set(0, 1, 0);
    return count_sec;
};
// create a count_sec count down object
const create_count_frames = ( objects ) => {
    const count = countDown.create({
        countID: 'frames',
        digits: 3,
        width: 1.4,
        source_objects: objects
    });
    count.position.set(0, 0.25, 1);
    count.scale.set(0.25, 0.25, 0.25);
    return count;
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
// dae loader
const DAE_loader = function( dae_url, on_loaded_item ){
    const manager = new THREE.LoadingManager();
    return new Promise( (resolve, reject) => {
        // ERROR WHEN LOADING
        manager.onError = function(url){
            reject(new Error( 'error when loading: ' + url ));
        };
        // WHEN ALL LOADING IS DONE
        manager.onLoad = function(){
            resolve();
        };
        const loader = new THREE.ColladaLoader(manager);
        loader.load(dae_url, on_loaded_item );
    });
};
// ---------- ----------
// LOADING MANAGER
// ---------- ----------
//DAE_loader('/dae/count_down_basic/cd1-uv.dae', DAE_on_loaded_item)
DAE_loader('/dae/count_down_basic/cd2.dae', DAE_on_loaded_item)
.then( () => {
    console.log('Done Loading.');
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    //scene.add( new THREE.GridHelper(10, 10) );
    // count secs count down object
    const count_sec = create_count_sec(SOURCE_OBJECTS);
    scene.add(count_sec);

    const count_frames = create_count_frames(SOURCE_OBJECTS);
    scene.add(count_frames);

    // ---------- ----------
    // UPDATE / ANIMATION LOOP
    // ---------- ----------
    const update = function(frame, frameMax){
        const a1 = (frame + 1) / frameMax;
        let secs = Math.floor(30 - 30 * a1);
        countDown.set(count_sec, secs);
        countDown.set(count_frames, frame);
        //count_sec.rotation.y = Math.PI * 4 * a1;

        // camera
        camera.position.x = 2 - 4 * a1;
        camera.lookAt( count_sec.position );
    };
    const loop = create_loop(update);
    loop();
})
.catch( (e) => {
    console.log(e.message);
    scene.add( new THREE.GridHelper(10, 10) );
    renderer.render(scene, camera);
});
