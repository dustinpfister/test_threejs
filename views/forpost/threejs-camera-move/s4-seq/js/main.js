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
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);

    // a sequnces object
    var seq = {
        objectIndex: 0,
        per: 0,
        bias: 0,
        frame: 0,
        frameMax: 300,
        beforeObjects: function(seq){
            
        },
        afterObjects: function(seq){
            camera.lookAt(mesh.position);
        },
        objects: [
            {
                per: 0,
                update: function(seq, partPer, partBias){
                    camera.position.set(10, 10, 10);
                }
            },
            {
                per: 0.25,
                update: function(seq, partPer, partBias){
                    camera.position.set(10 - 20 * partPer, 10, 10);
                }
            },
            {
                per: 0.30,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 10 - 7 * partPer, 10);
                }
            },
            {
                per: 0.35,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 3, 10);
                    var x = 10 * partBias;
                    camera.lookAt(mesh.position.clone().add(new THREE.Vector3(x, 0, 0)));
                }
            },
            {
                per: 0.75,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 3 - 10 * partPer, 10 - 30 * partPer);
                }
            }
        ]
    };



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
            
            seqHooks.setFrame(seq, seq.frame)

            renderer.render(scene, camera);
            seq.frame += fps_movement * secs;
            seq.frame %= seq.frameMax;
            lt = now;
        }
    };
    loop();
}
    ());