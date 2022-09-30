// random demo
const loopObj = loopMod.create({
    fps_update: 12,
    fps_movement: 80,
    pb: { r: 32, dx: 40, dy: 40},
    // init hook for prefroming actions that will only happen once
    // this is called once the loopObj is ready but has not been 
    // started yet for first time
    init: function(loopObj, scene, camera, renderer){
        const sud = scene.userData;
        sud.vMin = new THREE.Vector3(-5, -5, -5);
        sud.vMax = new THREE.Vector3(5, 5, 5);
        sud.vCenter = new THREE.Vector3();
        sud.dMax = 5;
        // SETUP MESH GROUP
        const group = scene.userData.group = new THREE.Group();
        const len = 60;
        let i = 0;
        while(i < len){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial({transparent: true}));
            const mud = mesh.userData;
            // setting a normalize direction
            mud.dir = new THREE.Vector3(
               -3 + 6 * Math.random() ,
               1 + 9 * Math.random() * (Math.random() > 0.5 ? 1 : -1),
               -3 + 6 * Math.random() );
            mud.dir.normalize();
            // setting a unit length to use to create a delta vector3
            mud.unit_length = 0.25 + 2.75 * Math.random();
            group.add(mesh);
            i += 1;
        };
        scene.add(group);
        ( document.getElementById('demo') || document.body ).appendChild( loopObj.container );
        // update camera and size
        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
    },
    // update method
    update: function(loop, scene, camera){
        const group = scene.userData.group;
        const sud = scene.userData;
        // update children
        group.children.forEach( (mesh, i) => {
             const ud = mesh.userData;
             // creating a delta vector that will be used to step position
             // based on current value of ud.dir, and ud.unit_length
             const delta = ud.dir.clone().multiplyScalar(ud.unit_length * loop.secs);
             mesh.position.x += delta.x;
             mesh.position.y += delta.y;
             mesh.position.z += delta.z;
             // USING THE WRAP VECTOR METHOD HERE
             loopMod.wrapVector(mesh.position, sud.vMin, sud.vMax);
             // setting opacity
             const d = mesh.position.distanceTo( sud.vCenter );
             let dAlpha = d / sud.dMax;
             dAlpha = THREE.MathUtils.clamp(dAlpha, 0, 1);
             mesh.material.opacity = 0.5 - 0.5 * dAlpha;
             // mesh objects look at 0, 0, 0;
             mesh.lookAt(0, 0, 0);
        });
    }
});
// do just once
loopMod.start(loopObj);
 

