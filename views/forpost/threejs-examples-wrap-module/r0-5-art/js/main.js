(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(10, 10, -10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1,10,3);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // make a cone with the geometry adjusted so that it points to x+ by default
    const makeCone = (len, radius, color) => {
        len = len === undefined ? 3 : len;
        radius = radius === undefined ? 0.5 : radius;
        color = color || new THREE.Color(1, 1, 1);
        const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(radius, len, 20, 20),
            new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8
            }));
        mesh.geometry.rotateX( Math.PI * 0.5 );
        mesh.geometry.rotateY( Math.PI * 0.5 );
        return mesh;
    };
    // make a cube
    const makeCube = (size, color) => {
        size = size === undefined ? 1 : size;
        color = color || new THREE.Color(1, 1, 1);
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8
            }));
        return mesh;
    };
    // get an alpha value for a wrap
    const getWrapAlpha = (value, vMin, vMax) => {
        const range = Math.abs(vMax - vMin);
        // looks like I might have a one liner here...
        return Math.abs( vMin - wrapMod.wrap(value, vMin, vMax) ) / range;
    };
    // update a group
    var updateGroup = function (group, secs) {
       var gud = group.userData;
       var bs = gud.boundSize / 2;
       var ms = gud.meshSize / 2;
       var a = bs * -1 + ms;
       var b = bs - ms;
       var vMin = new THREE.Vector3(a, a, a);
       var vMax = new THREE.Vector3(b, b, b);
       group.children.forEach(function(mesh){
            var ud = mesh.userData;
            // update
            mesh.position.x += ud.dir.x * ud.pps * secs;
            mesh.position.y += ud.dir.y * ud.pps * secs;
            mesh.position.z += ud.dir.z * ud.pps * secs;
            // if wrap vector
            if(gud.type === 'wrapVector'){
                wrapMod.wrapVector(
                    mesh.position,
                    vMin,
                    vMax);
            }
            // if wrap vector length type
            if(gud.type === 'wrapVectorLength'){
                wrapMod.wrapVectorLength(
                    mesh.position,
                    a,
                    b);
                mesh.lookAt(group.position);
            }

        });
    };
    // create group
    var createGroup = function (count, spread, ppsMin, ppsMax, meshSize, boundSize, color, getDir) {
        spread = spread === undefined ? 5 : spread;
        count = count === undefined ? 50 : count;
        ppsMin = ppsMin === undefined ? 0.5 : ppsMin;
        ppsMax = ppsMax === undefined ? 2 : ppsMax;
        meshSize = meshSize === undefined ? 1 : meshSize;
        boundSize = boundSize === undefined ? 4 : boundSize;
        color = color || new THREE.Color(1, 1, 1);
        getDir = getDir || function(){
            let v = new THREE.Vector3(1, 0, 0);
            let e = new THREE.Euler(
                0,
                Math.PI * 2 * Math.random(),
                Math.PI * 2 * Math.random());
            return v.applyEuler(e);
        };
        var group = new THREE.Group();
        var gud = group.userData;
        gud.meshSize = meshSize;
        gud.boundSize = boundSize;
        gud.type = 'wrapVector';
        var i = 0;
        while (i < count) {
            var mesh = makeCube(gud.meshSize, color);
            // start position
            mesh.position.x = spread * -1 + spread * 2 * THREE.MathUtils.seededRandom();
            mesh.position.y = spread * -1 + spread * 2 * THREE.MathUtils.seededRandom();
            mesh.position.z = spread * -1 + spread * 2 * THREE.MathUtils.seededRandom();
            // user data values, pps and direction
            var ud = mesh.userData;
            ud.pps = ppsMin + (ppsMax - ppsMin) * THREE.MathUtils.seededRandom();
            ud.dir = getDir(group, mesh, i);
            group.add(mesh);
            i += 1;
        }
        updateGroup(group, 0);
        return group;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    var group1 = createGroup(80, 5, 0.25, 1, 0.75, 5, new THREE.Color(0,1,1));
    group1.userData.type = 'wrapVector';
    group1.position.set(-5,0,-5);
    scene.add(group1);
    var group2 = createGroup(80, 5, 0.25, 1, 0.75, 5, new THREE.Color(0,1,0));
    group2.userData.type = 'wrapVectorLength';
    group2.position.set(5,0,5);
    scene.add(group2);
    const mesh1 = makeCone(7, 2);
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    let pi2 = Math.PI * 2,
    eMin = new THREE.Euler(0, pi2 * 0.5 * -1, 0),
    eMax = new THREE.Euler(pi2, pi2 * 0.25, pi2),
    degPerSec = 45,
    //vecMin = new THREE.Vector3(-4.5,-4.5,-4.5),
    //vecMax = new THREE.Vector3(4.5,4.5,4.5),
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroup(group1, secs);
            updateGroup(group2, secs);
            mesh1.rotation.y += Math.PI / 180 * degPerSec * secs;
            wrapMod.wrapEuler(mesh1.rotation, eMin, eMax);
            mesh1.material.opacity = 1 - Math.abs( 0.5 - getWrapAlpha(mesh1.rotation.y, eMin.y, eMax.y) ) / 0.5;
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());