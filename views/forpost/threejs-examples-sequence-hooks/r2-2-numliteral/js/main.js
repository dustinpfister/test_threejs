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
    // A MAIN SEQ OBJECT
    const seq = seqHooks.create({

        beforeObjects: (seq) => {
            camera.position.set(-10, 5, 5);
            camera.lookAt(0, 0, 0);
        },
        afterObjects: (seq) => {},
        objects: [
            // seq0 - 
            {
                secs: 3,
                v3Paths: [
                    {
                        key: 'm1pos',
                        array: [
                            //5, 0, 5,
                           // 5, 0, 3
                            new THREE.Vector3(5, 0, 5),
                            new THREE.Vector3(5, 0, -3)
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    mesh1.position.copy(seq.v3Paths.paths['m1pos'] );
                    // if target is object3d assume position property
                    //seq.getPos('m2pos', mesh);
                }
            },
            // seq1 - 
            {
                secs: 7,
                v3Paths: [
                    {
                        key: 'm1pos',
                        array: [
                            //5, 0, 3,
                            //-5, 0, -3
                            new THREE.Vector3(5, 0,-3),
                            new THREE.Vector3(-5,0,-3)
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    mesh1.position.copy(seq.v3Paths.paths['m1pos'] );
                }
            }
        ]
    });

seqHooks.setFrame(seq, 0, seq.frameMax);
console.log(seq.v3Paths)

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
