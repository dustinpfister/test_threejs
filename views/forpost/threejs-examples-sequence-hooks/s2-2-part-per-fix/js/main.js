(function () {
    //********
    // SCENE, CAMERA, and RENDERER
    //********
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
    var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    
    // A MAIN SEQ OBJECT
    var seq = seqHooks.create({
        beforeObjects: function(seq){
            mesh2.position.set(4 - 8 * seq.bias, 0, 1);
            //!!! I get werid partper values in r0 THOUGH
            if(seq.partPer >= 1){
                console.log(seq.objectIndex, seq.partPer.toFixed(2), seq.frame + ' / ' + seq.frameMax)
            }
        },
        objects: [
            {
                secs: 1,
                update: function(seq, partPer, partBias){
                    camera.position.set(10 - 20 * partPer, 10, 10);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 10, 10 - 20 * partPer);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 2,
                update: function(seq, partPer, partBias){
                    camera.position.set(-10, 10 - 20 * partPer, -10);
                    camera.lookAt(mesh1.position);
                }
            },
            {
                secs: 3,
                update: function(seq, partPer, partBias){
                    var a = -10 + 20 * partPer;
                    camera.position.set(a, a, a);
                    camera.lookAt(mesh1.position);
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