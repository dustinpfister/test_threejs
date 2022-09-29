// ---------- ----------
// DEMO
// ---------- ----------
const loopObj = loopMod.create({
    // init hook for prefroming actions that will only happen once
    // this is called once the loopObj is ready but has not been 
    // started yet for first time
    init: function(loopObj, scene, camera, renderer){
        // SETUP MESH GROUP
        const group = scene.userData.group = new THREE.Group();
        group.position.y = -5;
        const len = 20;
        let i = 0;
        while(i < len){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
            const ud = mesh.userData;
            ud.dir = new THREE.Vector3(-3 + 6 * Math.random() ,1 + 3 * Math.random(), -3 + 6 * Math.random() )
            group.add(mesh);
            i += 1;
        };
        scene.add(group);

        //(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
        ( document.getElementById('demo') || document.body ).appendChild( loopObj.container )

        camera.aspect = 640 / 200;
        camera.updateProjectionMatrix();
        loopObj.setSize(640, 200);

        // UI CANVAS
        const canvas = loopObj.canvas_ui;
        const ctx = loopObj.ctx_ui;

        //ctx.fillStyle = 'rgba(255,0,0,0.5)';
        //ctx.fillRect(0,0, canvas.width, canvas.height)

        // UI CNAVAS EVENTS

    },
    // what needs to happen each time the loop starts
    onStart: function(loopObj, scene, camera, renderer){
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);

        loopObj.frame = 0;
    },
    // update method
    update: function(loop, scene, camera){

        const group = scene.userData.group;
        group.children.forEach( (mesh, i) => {
             const ud = mesh.userData;
             mesh.position.x += ud.dir.x * loop.secs;
             mesh.position.y += ud.dir.y * loop.secs;
             mesh.position.z += ud.dir.z * loop.secs;
             mesh.position.x %= 10;
             mesh.position.y %= 10;
             mesh.position.z %= 10;
             mesh.lookAt(0, 0, 0);
        });

        //const degree = 90 * loop.getBias(1);
        //const degree = scene.userData.degree += 20 * loopObj.secs;
        //scene.userData.mesh.rotation.x = THREE.MathUtils.degToRad(degree);
    }
});
// do just once
loopMod.start(loopObj);
 

