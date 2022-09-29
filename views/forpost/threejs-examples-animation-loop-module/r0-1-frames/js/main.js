// ---------- ----------
// DEMO
// ---------- ----------
const loopObj = loopMod.create({
    // fps_update is actual update FPS rate ( lower for less CPU use, but choppy )
    fps_update: 16,
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
        // light
        const dl = new THREE.DirectionalLight(0xffffff, 1);
        dl.position.set(2, 1, 3);
        scene.add(dl);
        // cube
        const ud = scene.userData;
        const cube = ud.cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.5}));
        scene.add(cube);
        // progress bar mesh
        const bar = ud.bar = new THREE.Group();
        bar.add(new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 5),
                new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5})));
        bar.add(new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 0.25, 5),
                new THREE.MeshStandardMaterial({ color: 0x008888, transparent: true, opacity: 0.25})));
        scene.add(bar);
        bar.position.set(0.75, -1, 0);
        // ---------- ----------
        // SETUP CAMERA, SIZE, AND APPEND CONTAINER TO HTML
        // ---------- ----------
        // setup camera and size
        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);
        camera.position.set(2, 2, 0);
        camera.lookAt(0, -0.5, 0);
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
        const bar = ud.bar;
        cube.rotation.x = Math.PI * 2 * loop.getBias(2);
        cube.rotation.y = Math.PI * 2 * loop.getAlpha(1);
        let alpha = loop.getAlpha(1);
        bar.children[0].scale.set(1, 1, alpha);
        bar.children[0].position.z = (5 / 2) * (1 - alpha);
    }
});
// do just once
loopMod.start(loopObj);
 