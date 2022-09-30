// random demo
const loopObj = loopMod.create({
    fps_update: 12,
    fps_movement: 80,
    // init hook for prefroming actions that will only happen once
    // this is called once the loopObj is ready but has not been 
    // started yet for first time
    init: function(loopObj, scene, camera, renderer){
        // SETUP MESH GROUP
        const group = scene.userData.group = new THREE.Group();
        const len = 60;
        let i = 0;
        while(i < len){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial());
            const ud = mesh.userData;
            ud.dir = new THREE.Vector3(
               -3 + 6 * Math.random() ,
               1 + 3 * Math.random() * (Math.random() > 0.5 ? 1 : -1),
               -3 + 6 * Math.random() );
            group.add(mesh);
            i += 1;
        };
        scene.add(group);
        ( document.getElementById('demo') || document.body ).appendChild( loopObj.container );
        scene.add( new THREE.GridHelper() );
        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);
    },
    // what needs to happen each time the loop starts
    onStart: function(loopObj, scene, camera, renderer){
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
    },
    // update method
    update: function(loop, scene, camera){
        const group = scene.userData.group;
        group.children.forEach( (mesh, i) => {
             const ud = mesh.userData;
             mesh.position.x += ud.dir.x * loop.secs;
             mesh.position.y += ud.dir.y * loop.secs;
             mesh.position.z += ud.dir.z * loop.secs;
             loopMod.wrapVector(mesh.position, new THREE.Vector3(-5, -5, -5),new THREE.Vector3(5, 5, 5))
             mesh.lookAt(0, 0, 0);
        });
    }
});
// do just once
loopMod.start(loopObj);
 

