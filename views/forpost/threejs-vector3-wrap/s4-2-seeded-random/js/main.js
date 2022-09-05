(function () {
    //-------- ----------
    // SCENE, CAMERA RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // create group
    var createGroup = function (count, spread, ppsMin, ppsMax) {
        spread = spread === undefined ? 5 : spread;
        count = count === undefined ? 5 : count;
        ppsMin = ppsMin === undefined ? 0.25 : ppsMin;
        ppsMax = ppsMax === undefined ? 2 : ppsMax;
        var group = new THREE.Group();
        var i = 0;
        while (i < count) {
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 0.25, 0.25), 
                new THREE.MeshNormalMaterial({
                    transparent: true,
                    opacity: 0.60
                })
            );
            // start position
            mesh.position.x = spread * THREE.MathUtils.seededRandom();
            mesh.position.y = spread * THREE.MathUtils.seededRandom();
            mesh.position.z = spread * THREE.MathUtils.seededRandom();
            // user data values
            var ud = mesh.userData;
            ud.pps = ppsMin + (ppsMax - ppsMin) * THREE.MathUtils.seededRandom();
            ud.dir = new THREE.Vector3(-2 + 4 * THREE.MathUtils.seededRandom(), 0, 1).normalize();
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update a group
    var updateGroup = function (group, secs, bias) {
       group.children.forEach(function(mesh){
            var ud = mesh.userData;
            mesh.position.x += ud.dir.x * ud.pps * secs;
            mesh.position.y += ud.dir.y * ud.pps * secs;
            mesh.position.z += ud.dir.z * ud.pps * secs;
            wrapVector(
                mesh.position,
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
        });
    };
    //-------- ----------
    // LOOP
    //-------- ----------
    var group = createGroup(100, 5, 0.05, 2);
    scene.add(group);
    var frame = 0,
    maxFrame = 300,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroup(group, secs, bias)
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
