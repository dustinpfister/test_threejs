(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    renderer.setSize(640, 480, false);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create curve helper
    const createCurve = (vStart, vEnd, vDelta) => {
        vDelta = vDelta || new THREE.Vector3();
        // control point is half way between vStart and vEnd
        vControl = vStart.clone().lerp(vEnd, 0.5).add( vDelta );
        return new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
    };
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    //-------- ----------
    // CURVE, POINTS
    //-------- ----------
    const curve = new THREE.CurvePath();
    curve.add(createCurve(
        new THREE.Vector3(-5, 0, 5),
        new THREE.Vector3(5, 0, -3),
        new THREE.Vector3(5, 0, 5)
    ));
    curve.add(createCurve(
        new THREE.Vector3(5, 0, -3),
        new THREE.Vector3(-2, 0, -5),
        new THREE.Vector3(4, 0, -5)
    ));
    curve.add(createCurve(
        new THREE.Vector3(-2, 0, -5),
        new THREE.Vector3(-5, 0, 2),
        new THREE.Vector3(-8, 0, 2)
    ));
    // points
    const points = new THREE.Points(
        (new THREE.BufferGeometry).setFromPoints( curve.getPoints(50) ),
        new THREE.PointsMaterial({ size: 0.2})
    );
    scene.add(points);
    //-------- ----------
    // A MAIN SEQ OBJECT
    //-------- ----------
    const seq = seqHooks.create({
        v3Paths: [
            {
                key: 'm1pos',
                array: curve.getPoints(50),
                lerp: true
            }
        ],
        beforeObjects: (seq) => {
            seq.copyPos('m1pos', mesh1);
            mesh1.lookAt(0, 0, 0);
        },
        objects: [
            // seq0 - 
            {
                secs: 15,
                update: (seq, partPer, partBias) => {
                    camera.position.copy(mesh1.position).add(new THREE.Vector3(0, 2, -4));
                    camera.lookAt(mesh1.position);
                }
            },
            // seq1 - 
            {
                secs: 5,
                update: (seq, partPer, partBias) => {
                    const v1 = mesh1.position.clone().add(new THREE.Vector3(0, 2, -4));
                    const v2 = new THREE.Vector3(8, 8, 8);
                    camera.position.copy(v1).lerp(v2, partPer);
                    camera.lookAt(mesh1.position);
                }
            },
            // seq2 - 
            {
                secs: 10,
                update: (seq, partPer, partBias) => {
                    camera.position.set(8, 8, 8);
                    camera.lookAt(mesh1.position);
                }
            },
        ]
    });
    // APP LOOP
    const fps_update = 30,
    fps_movement = 30;
    let lt = new Date();
    const loop = () => {
        const now = new Date(),
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
