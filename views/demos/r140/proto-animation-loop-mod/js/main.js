// ---------- ----------
// DEMO
// ---------- ----------
const loopObj = loopMod.create({
    init: function(loopObj, scene, camera, renderer){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        mesh.name = 'mesh';
        scene.userData.mesh = mesh;
        scene.add(mesh);
        (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    },
    onStart: function(loopObj, scene, camera, renderer){
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
        renderer.setSize(640, 480);
        scene.userData.mesh.rotation.x = 0;
        loopObj.frame = 0;
    },
    update: function(loopObj, frame, frameMax, scene, camera){
        const degree = 360 * (frame / frameMax);
        scene.userData.mesh.rotation.x = THREE.MathUtils.degToRad(degree);
    }
});
// do just once
loopMod.start(loopObj);
 
// event 
const canvas = loopObj.renderer.domElement;
canvas.onselectstart = function () { return false; }
canvas.addEventListener('click', (e) => {
    if(loopObj.active){
        loopMod.stop(loopObj);
    }else{
        loopMod.start(loopObj);
    }
});
