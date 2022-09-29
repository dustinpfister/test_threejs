// ---------- ----------
// DEMO
// ---------- ----------
const loopObj = loopMod.create({
    // fps_update is actual update FPS rate ( lower for less CPU use, but choppy )
    fps_update: 8,     
    // fps_movement is the rate at which frames will update by system time
    fps_movement: 30,
    // if FAME_MAX == 300 and fps_movement === 30 then it is a 10 sec loop
    FRAME_MAX: 300,
    // init hook for prefroming actions that will only happen once
    // this is called once the loopObj is ready but has not been 
    // started yet for first time
    init: function(loopObj, scene, camera, renderer){
        // ---------- ----------
        // ADD OBJECTS
        // ---------- ----------
        const ud = scene.userData;
        const cube = ud.cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5}));
        scene.add(cube);
        // ---------- ----------
        // SETUP CAMERA, SIZE, AND APPEND CONTAINER TO HTML
        // ---------- ----------
        // setup camera and size
        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
        ( document.getElementById('demo') || document.body ).appendChild( loopObj.container )
    },
    // what needs to happen each time the loop starts
    onStart: function(loopObj, scene, camera, renderer){
        loopObj.frame = 0;
    },
    // update method
    update: function(loop, scene, camera){
        const ud = scene.userData;
        const cube = ud.cube;
        cube.rotation.y = Math.PI * 2 * loop.getAlpha(1);
    }
});
// do just once
loopMod.start(loopObj);
 