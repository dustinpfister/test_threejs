// ---------- ----------
// Basic example for r1 of threejs-examples-animation-loop-module
// ---------- ----------
const loopObj = loopMod.create({
    fps_update: 30,
    fps_movement: 30,
    FRAME_MAX: 300,
    pb: { r: 16, dx:40, dy: 50 },
    init: function(loopObj, scene, camera, renderer){
        // cube
        const ud = scene.userData;
        const cube = ud.cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5}));
        scene.add(cube);
        // setup camera and size
        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);
        camera.position.set(1.2, 1.2, 1.2);
        camera.lookAt(0, 0, 0);
        ( document.getElementById('demo') || document.body ).appendChild( loopObj.container )
    },
    onStart: function(loopObj, scene, camera, renderer){
        loopObj.frame = 0;
    },
    update: function(loop, scene, camera){
        const ud = scene.userData;
        const cube = ud.cube;
        cube.rotation.y = Math.PI * 2 * loop.getAlpha(1);
    }
});
loopMod.start(loopObj);
 