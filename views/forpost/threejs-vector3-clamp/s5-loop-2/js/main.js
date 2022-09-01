
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
    // LIGHT
    //-------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(8, 1, 2)
    scene.add(dl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // mod method
    var mod = function (a, b) {
        return THREE.MathUtils.euclideanModulo(a, b);
    };
    // wrap and axis
    var wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        var maxD = new THREE.Vector2(vecMin[axis], 0).distanceTo( new THREE.Vector2(vecMax[axis], 0) );
        var d = new THREE.Vector2(vec[axis], 0).distanceTo( new THREE.Vector2(vecMin[axis], 0) );
        if(maxD === 0){
           vec[axis] = 0;
        }else{
            if(vec[axis] >= vecMax[axis]){
                vec[axis] = vecMin[axis] + mod(d, maxD);
            }
            if(vec[axis] < vecMin[axis]){
                vec[axis] = vecMax[axis] - mod(d, maxD);
            }
        }
    };
    // wrap a vector
    var wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(0, 0, 0);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        wrapAxis(vec, vecMin, vecMax, 'x');
        wrapAxis(vec, vecMin, vecMax, 'y');
        wrapAxis(vec, vecMin, vecMax, 'z');
    };
    // get a random axis
    var randAxis = function () {
        return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
    };
    // create group
    var createGroup = function (clampType, color) {
        clampType = clampType || 'clamp';
        color = color || 0xffffff;
        var group = new THREE.Group();
        var i = 0,
        len = 10;
        while (i < len) {
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1.0, 1.0, 1.0), 
                new THREE.MeshPhongMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.60
                })
            );
            var ud = mesh.userData;
            var start_dir = ud.start_dir = new THREE.Vector3();
            ud.alpha = 0;
            ud.dr = 0.05 + 0.95 * Math.random();
            ud.clampType = clampType;
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
            // clamp type
            if(ud.clampType === 'clamp'){
                pos.clamp(
                    new THREE.Vector3(-2, -2, -2),
                    new THREE.Vector3(2, 2, 2));
                if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
                    ud.alpha = 0;
                }
            }
            // if clamp type is length
            if(ud.clampType === 'length'){
                pos.clampLength(0.1, 2);
                mesh.lookAt(group.position);
                if(pos.length() === 2){
                    ud.alpha = 0;
                }
            }
            // if clamp type is wrap
            if(ud.clampType === 'wrap'){
                wrapVector(
                    pos,
                    new THREE.Vector3(-2, -2, -2),
                    new THREE.Vector3(2, 2, 2));
                //ud.alpha = ud.alpha % 2;
            }
        });
    };
    //-------- ----------
    // LOOP
    //-------- ----------
    var group1 = createGroup('clamp', 0xff0000);
    scene.add(group1);
    var group2 = createGroup('length', 0x00ff00);
    scene.add(group2);
    var group3 = createGroup('wrap', 0x00ffff);
    scene.add(group3);
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
            update(group1, 0.1);
            update(group2, 0.1);
            update(group3, 0.1);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
