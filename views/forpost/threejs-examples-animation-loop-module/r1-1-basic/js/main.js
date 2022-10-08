// ---------- ----------
// Basic example for r1 of threejs-examples-animation-loop-module
// ---------- ----------
const loopObj = loopMod.create({
    el: ( document.getElementById('demo') || document.body ),
    width: 640, height: 200,
    fps_update: 30,
    fps_movement: 30,
    FRAME_MAX: 300,
    pb: { r: 16, dx:40, dy: 50 }, // play button adjustment
    init: function(li, scene, camera, renderer){
        // cube
        const ud = scene.userData;
        const cube = ud.cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5}));
        scene.add(cube);
        li.camera.position.set(1.2, 1.2, 1.2);
        li.camera.lookAt(0, 0, 0);
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
 