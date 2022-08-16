(function () {
    //******** **********
    // SCENE, CAMERA, and RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10))
    var width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(width, height);
    //******** **********
    // MESH
    //******** **********
    var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    //******** **********
    // PUBLIC seqHooks.getPer
    //******** **********
    console.log( seqHooks.getPer(2, 10, 1) ); // 0.2
    console.log( seqHooks.getPer(2, 10, 2) ); // 0.4
    console.log( seqHooks.getBias(2, 10, 1) ); // 0.4
    console.log( seqHooks.getBias(2, 10, 2) ); // 0.8
    console.log( seqHooks.getSinBias(2, 10, 1) ); // 0.5877852522924731
    console.log( seqHooks.getSinBias(2, 10, 2) ); // 0.9510565162951535
    //******** **********
    // CREATE seq objects using seq.getPer
    //******** **********
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        // before current seq.objects
        beforeObjects: function(seq){
            // mesh1
            var r = Math.PI * 2 * seq.per;
            var x = Math.cos(r) * 2;
            var z = Math.sin(r) * 2;
            mesh1.position.set(x, 0, z);
            mesh1.lookAt(mesh2.position);
            // defaults for camera
            camera.fov = 40;
        },
        // after current seq.objects
        afterObjects: function(seq){
            // always update camera matrix after beforeObjects hook, 
            // and current update in seq.objects
            camera.updateProjectionMatrix();
        },
        // array of objects for each sequnce
        objects: [
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    var p = seq.getPer(4);
                    var r = Math.PI * 2 * p,
                    x = Math.cos(r) * 5,
                    z = Math.sin(r) * 5;
                    mesh2.position.set(x, 0, z);
                    // camera
                    var b = seq.getSinBias(4);
                    camera.fov = 40 - 15 * b;
                    camera.position.set(10, 10, 10);
                    camera.lookAt(0, 0, 0);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    var p = seq.getPer(2);
                    var r = Math.PI * 2 * p,
                    x = Math.cos(r) * 5,
                    z = Math.sin(r) * 5;
                    mesh2.position.set(x, z, 0);
                    // camera
                    var b = seq.getBias(2);
                    camera.fov = 40 - 15 * b;
                    camera.position.set(10, 10, 10);
                    camera.lookAt(0, 0, 0);
                }
            }
        ]
    });
    //******** **********
    // APP LOOP
    //******** **********
    var secs = 0,
    fps_update = 30,
    fps_movement = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            // update by hooks
            seqHooks.setFrame(seq, seq.frame, seq.frameMax);
            renderer.render(scene, camera);
            seq.frame += fps_movement * secs;
            seq.frame %= seq.frameMax;
            lt = now;
        }
    };
    loop();
}());