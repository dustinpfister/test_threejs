(function () {
    // SCENE, CAMERA, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        // before current object hook
        beforeObjects: function(seq){
             // default value for camera
             camera.fov = 60;
             camera.aspect = 640 / 480;
             camera.position.set(10, 10, 10);
             camera.lookAt(0, 0, 0);
             // always rotate mesh object
             mesh1.rotation.y = Math.PI * 2 * seq.per;
        },
        // after current object hook
        afterObjects: function(seq){
             // always update the projection matrix so that any values
             // like fov or aspect take effect from before hook, and 
             // current update method in seq.objects
             camera.updateProjectionMatrix();
        },
        // the objects for eac sequence
        objects: [
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    camera.fov = 10 + 50 * partPer;
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                     var w = 640 - 320 * partPer;
                     var h = 480 + 240 * partPer;
                     camera.aspect = w / h;
                }
            }
        ]
    });
    // APP LOOP
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