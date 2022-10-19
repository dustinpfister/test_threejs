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
    // MESH
    //-------- ----------
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    const pathGeo = new THREE.SphereGeometry(5, 20, 20);
    const points = new THREE.Points(pathGeo, new THREE.PointsMaterial({size: 0.25}));
    scene.add(points)
    // A MAIN SEQ OBJECT
    const seq = seqHooks.create({
        v3Paths: [
            {
                key: 'm1pos',
                // using the array of a position attribute
                array: pathGeo.getAttribute('position').array,
                lerp: true
            }
        ],
        beforeObjects: (seq) => {
            //mesh1.position.copy(seq.v3Paths.paths['m1pos'] );
            seq.copyPos('m1pos', mesh1);
            //mesh1.lookAt( seq.copyPos('m1pos') );
            mesh1.lookAt(0, 0, 0);
            camera.position.set(-12, 7, 7);
            camera.lookAt(0, 0, 0);
        },
        afterObjects: (seq) => {},
        objects: [
            // seq0 - 
            {
                secs: 30,
                v3Paths: [
                    {
                        key: 'campos',
                        array: [
                            2, 14, 2,
                            0, 12, 2,
                            -5, 10, 4,
                            -8, 7, 5,
                            -12, 7, 7
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    seq.copyPos('campos', camera);
                    camera.lookAt(0, 0, 0);
                }
            },
            // seq1 - 
            {
                secs: 30,
                update: (seq, partPer, partBias) => {
                }
            }
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
