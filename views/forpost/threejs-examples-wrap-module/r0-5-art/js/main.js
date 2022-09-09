(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
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
            mesh.position.x += ud.dir.x * ud.pps * secs;
            mesh.position.y += ud.dir.y * ud.pps * secs;
            mesh.position.z += ud.dir.z * ud.pps * secs;

            //wrapMod.wrapVector(
            //    mesh.position,
            //    vMin,
            //    vMax);

            wrapMod.wrapVectorLength(
                mesh.position,
                1,
                2);

            mesh.lookAt(group.position);
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
    // MESH
    //-------- ----------
    var mesh1 = makeCube();
    scene.add(mesh1);

    var group1 = createGroup(100, 5, 0.25, 1, 0.75, 4);
    scene.add(group1);

    //-------- ----------
    // LOOP
    //-------- ----------
    var dir = new THREE.Euler(0, 0, 1),
    unitsPerSec = 4,
    vecMin = new THREE.Vector3(-4.5,-4.5,-4.5),
    vecMax = new THREE.Vector3(4.5,4.5,4.5),
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // update dir
            dir.y += Math.PI / 180 * 40 * secs;
            wrapMod.wrapEuler(dir);
            // figure delta
            let delta = new THREE.Vector3(0, 0, 1);
            delta = delta.applyEuler(dir).normalize().multiplyScalar(unitsPerSec * secs);
            // USING wrapMod main method to wrap mesh1.position
            mesh1.position.add(delta);
            wrapMod.wrapVectorLength(mesh1.position, 2.5, 4.5);
            mesh1.lookAt(0, 0, 0);

updateGroup(group1, secs);

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