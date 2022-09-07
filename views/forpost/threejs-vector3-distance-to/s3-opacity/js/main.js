(function () {
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // opaicty effect using length method which is distance to origin
    let opacityEffect = (mesh) =>  {
        mesh.material.opacity = 1 - mesh.position.length() / 5;
    };
    // rotation effect using the distanceTo method
    let rotationEffect = (group, mesh) =>  {
        let minDist = 5;
        group.children.forEach( (child) => {
            mesh.lookAt(0, 0, 0);
            if(child != mesh){
                let d = mesh.position.distanceTo(child.position);
                if(d < minDist){
                    let p = d / minDist;
                    let ud = mesh.userData;
                    ud.rp += p;
                    ud.rp %= 1;
                    mesh.rotation.z += Math.PI / 180 * ud.maxDegPerChid * ud.rp;
                }
            }
        })
    };
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
    // set new mesh user data
    let newMeshUserData = (mesh) => {
        // user data
        let ud = mesh.userData;
        ud.startPos = getSeededRandomStartPosition();
        ud.alphaDelta = 0.1 + 0.5 * THREE.MathUtils.seededRandom();
        ud.alpha = 0;
        ud.rp = 0;
        ud.maxDegPerChid = 5 + 355 * THREE.MathUtils.seededRandom();
    };
    // create group
    let createGroup = (count) => {
        count = count === undefined ? 10 : count;
        let group = new THREE.Group();
        let i = 0;;
        while(i < count){
            // create mesh object
            let mesh = new THREE.Mesh( 
                new THREE.BoxGeometry(1,1,1), 
                new THREE.MeshNormalMaterial({
                    transparent: true
                }) );
            // user data
            let ud = mesh.userData;
            newMeshUserData(mesh);
            // start pos, lookAt, add to group
            mesh.position.copy( ud.startPos );
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
            // new positon using start pos in userData and lerping from there
            mesh.position.copy(ud.startPos).lerp( new THREE.Vector3(), ud.alpha );
            // new data if alpha === 1
            if(ud.alpha === 1){
                newMeshUserData(mesh);
            }
            // opaicty effect
            opacityEffect(mesh);
            rotationEffect(group, mesh);
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
    let group1 = createGroup(80);
    scene.add(group1);
    let group2 = createGroup(20);
    group2.position.set(-10, 0, 0);
    scene.add(group2);
    let group3 = createGroup(20);
    group3.position.set(0, 0, -10);
    scene.add(group3);
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
            updateGroup(group1, secs);
            updateGroup(group2, secs);
            updateGroup(group3, secs);
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
