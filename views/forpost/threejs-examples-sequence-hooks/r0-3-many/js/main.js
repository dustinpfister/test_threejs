(function () {
    // SCENE, CAMERA, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10))
    var width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(width, height);
    // MESH
    var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    // seq object for mesh1 that scales the mesh
    var seq_mesh1_scale = seqHooks.create({
        setPerValues: false,
        beforeObjects: function(seq){
            mesh1.scale.set(1, 1, 1);
        },
        objects: [
            {
                per: 0,
                update: function(seq, partPer, partBias){
                    var s = 1 + 2 * partPer;
                    mesh1.scale.set(s, s, s);
                }
            },
            {
                per: 0.15,
                update: function(seq, partPer, partBias){
                    mesh1.scale.set(3, 3, 3);                    
                }
            },
            {
                per: 0.25,
                update: function(seq, partPer, partBias){
                    var s = 3 - 2 * partPer;
                    mesh1.scale.set(s, s, s);                    
                }
            }
        ]
    });
    // seq object for mesh1 that rotates the mesh
    var seq_mesh1_rotate = seqHooks.create({
        setPerValues: false,
        beforeObjects: function(seq){
            mesh1.scale.set(1, 1, 1);
            mesh1.rotation.set(0, 0, 0);
            mesh1.rotation.y = Math.PI * 4 * seq.per;
        },
        objects: [
            {
                per: 0,
                update: function(seq, partPer, partBias){
                    mesh1.rotation.x = Math.PI * 1.5;
                }
            },
            {
                per: 0.5,
                update: function(seq, partPer, partBias){
                    mesh1.rotation.x = Math.PI;
                }
            }
        ]
    });
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        beforeObjects: function(seq){
            var r = Math.PI * 2 * seq.per;
            var x = Math.cos(r) * 4;
            var z = Math.sin(r) * 4;
            mesh2.position.set(x, 0, z);
        },
        afterObjects: function(seq){
            camera.lookAt(mesh1.position);
        },
        objects: [
            {
                per: 0,
                secs: 3,
                update: function(seq, partPer, partBias){
                    // seq_mesh1
                    seqHooks.setFrame(seq_mesh1_scale, seq.partFrame, seq.partFrameMax);
                    // camera
                    camera.position.set(10, 10, 10);
                }
            },
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    // camera
                    camera.position.set(10 - 20 * partPer, 10, 10);
                }
            },
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    // camera
                    camera.position.set(-10, 10 - 7 * partPer, 10);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    // camera
                    camera.position.set(-10, 3, 10);
                    var x = 10 * partBias;
                    camera.lookAt(mesh1.position.clone().add(new THREE.Vector3(x, 0, 0)));
                }
            },
            {
                secs: 10,
                update: function(seq, partPer, partBias){
                    // seq_mesh1
                    seqHooks.setFrame(seq_mesh1_rotate, seq.partFrame, seq.partFrameMax);
                    // camera
                    camera.position.set(-10, 3 - 10 * partPer, 10 - 30 * partPer);
                }
            }
        ]
    });
    // APP LOOP
    var secs = 0,
    fps_update = 10,
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