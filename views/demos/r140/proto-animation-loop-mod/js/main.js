// ---------- ----------
// DEMO
// ---------- ----------
const loopObj = loopMod.create({
    // init hook for prefroming actions that will only happen once
    // this is called once the loopObj is ready but has not been 
    // started yet for first time
    init: function(loopObj, scene, camera, renderer){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        mesh.name = 'mesh';
        scene.userData.mesh = mesh;
        scene.add(mesh);
        scene.userData.degree = 0;
        (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
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
    },
    // what needs to happen each time the loop starts
    onStart: function(loopObj, scene, camera, renderer){
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
        renderer.setSize(640, 480);
        scene.userData.mesh.rotation.x = 0;
        loopObj.frame = 0;
    },
    // update method
    update: function(loop, scene, camera){
        const degree = 360 * loop.getAlpha(2);
        //const degree = scene.userData.degree += 20 * loopObj.secs;
        scene.userData.mesh.rotation.x = THREE.MathUtils.degToRad(degree);
    }
});
// do just once
loopMod.start(loopObj);
 

