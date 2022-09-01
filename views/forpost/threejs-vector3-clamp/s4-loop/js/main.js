
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // get a random axis
    var randAxis = function () {
        return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
    };
    // create group
    var createGroup = function () {
        var group = new THREE.Group();
        var i = 0,
        len = 50;
        while (i < len) {
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1.0, 1.0, 1.0), 
                new THREE.MeshNormalMaterial({
                    transparent: true,
                    opacity: 0.50
                })
            );
            var ud = mesh.userData;
            var start_dir = ud.start_dir = new THREE.Vector3();
            ud.alpha = 0;
            ud.dr = 0.05 + 0.95 * Math.random();
            start_dir.x = randAxis();
            start_dir.y = randAxis();
            start_dir.z = randAxis();
            mesh.position.copy(start_dir.normalize().multiplyScalar(2));
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update group
    var update = function (group, delta) {
        group.children.forEach(function (mesh, i) {
            var ud = mesh.userData;
            var start_dir = ud.start_dir;
            var pos = mesh.position;
            ud.alpha += delta * ud.dr;
            pos.copy(start_dir.clone().normalize().multiplyScalar(ud.alpha));
            pos.clamp(
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
            if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
                ud.alpha = 0;
            }
/*
            pos.clampLength(
                0.1,
                2);
            mesh.lookAt(group.position);
            if(pos.length() === 2){
                ud.alpha = 0;
            }



*/
        });
    };
    //-------- ----------
    // LOOP
    //-------- ----------
    var group = createGroup();
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
            update(group, 0.1);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
