// ---------- ----------
// Basic example for r1 of threejs-examples-animation-loop-module
// ---------- ----------
const loopObj = loopMod.create({
    el: ( document.getElementById('demo') || document.body ),
    fps_update: 12,
    fps_movement: 30,
    FRAME_MAX: 300,
    pb: { r: 16, dx:40, dy: 50 }, // play button adjustment
    init: function(li, scene, camera, renderer){
        // cube
        const ud = scene.userData;
        const material = new THREE.LineBasicMaterial({ 
            color: new THREE.Color(0,1,0.25), transparent: true, opacity: 0.6, linewidth: 4
        });
        const cube = ud.cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.75, 0.75, 0.75)), material);
        scene.add(cube);
        // cube children
        const cone = new THREE.LineSegments( new THREE.EdgesGeometry(new THREE.ConeGeometry(0.25, 1, 5, 20)), material);
        cone.geometry.rotateX(Math.PI * 1.5);
        cone.position.set(1, 0, 0);
        cone.lookAt(cube.position);
        cube.add(cone);
        // camera
        li.camera.position.set(1.2, 1.2, 1.2);
        li.camera.lookAt(0, 0, 0);
    },
    onStart: function(loopObj, scene, camera, renderer){
        loopObj.frame = 0;
    },
    update: function(li, scene, camera){
        const ud = scene.userData;
        const cube = ud.cube;
        cube.rotation.y = Math.PI * 2 * li.getAlpha(1);
        cube.rotation.x = Math.PI / 180 * (-45 + 90 * li.getBias(2));
    }
});
loopMod.start(loopObj);
setTimeout(function(){
    loopMod.stop(loopObj);
}, 100);

