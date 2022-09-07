(function () {
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------

    // get a start position by passing two values that are 0 - 1
    let getStartPosition = (a, b) => {
        a = a === undefined ? 0 : a;
        b = b === undefined ? 0 : b;
        let pos = new THREE.Vector3( 5, 0, 0);
        let e = new THREE.Euler(0, a * Math.PI * 2, b * Math.PI * 2);
        return pos.applyEuler(e);
    };
    // get a seeded random start position
    let getSeededRandomStartPosition = function(){
        return getStartPosition(
            THREE.MathUtils.seededRandom(), 
            THREE.MathUtils.seededRandom() );
    };
    // create group
    let createGroup = () => {
        let group = new THREE.Group();
        let i = 0, count = 40;
        while(i < count){
            // create mesh object
            let mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() );
            // user data
            let ud = mesh.userData;
            ud.startPos = getSeededRandomStartPosition();
            ud.alphaDelta = 0.5;
            ud.alpha = 0;
            // start pos, lookAt, add to group
            mesh.position.copy( ud.startPos );
            mesh.lookAt(0, 0, 0);
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update group
    let updateGroup = function(group, secs){
        secs = secs === undefined ? 0 : secs;

        group.children.forEach( (mesh) => {
            let ud = mesh.userData;
            ud.alpha += ud.alphaDelta * secs;
            ud.alpha = ud.alpha > 1 ? 1 : ud.alpha;

            mesh.position.copy(ud.startPos).lerp( new THREE.Vector3(), ud.alpha );

        });

    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    let scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    let camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // OBJECTS
    //-------- ----------

    let group = createGroup();
    scene.add(group);


    //-------- ----------
    // LOOP
    //-------- ----------
    let lt = new Date(),
    fps = 30;
    let loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroup(group, secs);
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();

}
    ());
