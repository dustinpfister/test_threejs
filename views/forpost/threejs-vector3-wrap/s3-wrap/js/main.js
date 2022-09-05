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
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //
    var wrap = function (value, a, b){
        // get min and max this way
        var max = Math.max(a, b);
        var min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        var range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    var wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
    };
    // wrap a vector
    var wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(0, 0, 0);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        wrapAxis(vec, vecMin, vecMax, 'x');
        wrapAxis(vec, vecMin, vecMax, 'y');
        wrapAxis(vec, vecMin, vecMax, 'z');
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
                    opacity: 0.60
                })
            );
            mesh.position.x = -2 + 4 * Math.random();
            mesh.position.y = -2 + 4 * Math.random();
            mesh.position.z = -2 + 4 * Math.random();
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update a group
    var updateGroup = function (group, secs, bias) {
       group.children.forEach(function(mesh){
            mesh.position.x += (2 - 4 * bias) * secs;
            mesh.position.y += (-2 + 4 * bias ) * secs;
            mesh.position.z += 2 * secs;
            wrapVector(
                mesh.position,
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
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
