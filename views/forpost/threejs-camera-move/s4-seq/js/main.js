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
        frameMax: 100,
        objects: [
            {
                per: 0,
                update: function(seq, partPer, partBias){

                }
            },
            {
                per: 0.25,
                update: function(seq, partPer, partBias){

                }
            }
        ]
    };

    var getPer = function(a, b){
        return a / b;
    };

    var getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };

    var setFrame = function(seq, frame){

        seq.frame = frame;
        seq.per = getPer(frame, seq.frameMax);
        seq.bias = getBias(seq.per);

        // update object index
        seq.objectIndex = 0;
        var i = 0, len = seq.objects.length;
        while(i < len){
            var obj = seq.objects[i];
            var per2 = 1;
            if(seq.objects[i + 1] != undefined){
                per2 = seq.objects[i + 1].per;
            }
            // if this is the current object update object 
            // index as well as other relavent values
            if(seq.per >= obj.per && seq.per < per2){
                seq.objectIndex = i;
                seq.partFrameMax = Math.floor( (per2 - obj.per) * seq.frameMax );
                break;
            }
            i += 1;
        }

console.log(seq)

        // call update for current object
        //var obj = seq.objects[seq.objectIndex];
        //obj(seq, seq.partPer, seq.partBias);

    };

setFrame(seq, 25)

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
            // MOVEING THE MESH OBJECT
            //mesh.position.x = -5 + 10 * bias

            // SETTING POSITION OF THE CAMERA RELATIVE TO THE POSITION OF THE MESH
            //camera.position.copy(mesh.position).add( new THREE.Vector3(3, 3 - 6 * bias, 3) );

            // CALLING THE LOOKAT METHOD OF THE CAMERA
            camera.lookAt(mesh.position);

            renderer.render(scene, camera);
            seq.frame += fps_movement * secs;
            seq.frame %= seq.frameMax;
            lt = now;
        }
    };
    loop();
}
    ());