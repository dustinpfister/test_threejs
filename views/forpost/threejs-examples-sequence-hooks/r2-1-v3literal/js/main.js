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
    const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    // A MAIN SEQ OBJECT
    const seq = seqHooks.create({
        v3Paths: [
            {
                key: 'm1pos',
                array: [
                    new THREE.Vector3(0, 0, 5),
                    new THREE.Vector3(2,-1, 0),
                    new THREE.Vector3(2,-2,-5)
                ],
                lerp: false
            }
        ],
        beforeObjects: (seq) => {
            camera.position.set(-10, 5, 5);
            camera.lookAt(0, 0, 0);
            mesh1.position.copy(seq.v3Paths.paths['m1pos'] );
        },
        afterObjects: (seq) => {},
        objects: [
            // seq0 - 
            {
                secs: 3,
                v3Paths: [
                    {
                        key: 'm2pos',
                        array: [
                            new THREE.Vector3(5, 0, 5),
                            new THREE.Vector3(5, 0, 4),
                            new THREE.Vector3(5, 0, 3),
                            new THREE.Vector3(5, 0, 2),
                            new THREE.Vector3(5, 0, 1),
                            new THREE.Vector3(5, 0, 0),
                            new THREE.Vector3(5, 0, -1),
                            new THREE.Vector3(5, 0, -2),
                            new THREE.Vector3(5, 0, -3)
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    mesh2.position.copy(seq.v3Paths.paths['m2pos'] );
                }
            },
            // seq1 - 
            {
                secs: 7,
                v3Paths: [
                    {
                        key: 'm2pos',
                        array: [
                            new THREE.Vector3(5, 0,-3),
                            new THREE.Vector3(4, 0,-3),
                            new THREE.Vector3(3, 0,-3),
                            new THREE.Vector3(2, 0,-3),
                            new THREE.Vector3(1, 0,-3),
                            new THREE.Vector3(0, 0,-3),
                            new THREE.Vector3(-1, 0,-3),
                            new THREE.Vector3(-2, 0,-3),
                            new THREE.Vector3(-3, 0,-3),
                            new THREE.Vector3(-4, 0,-3),
                            new THREE.Vector3(-5,0,-3)
                        ],
                        lerp: true
                    }
                ],
                update: (seq, partPer, partBias) => {
                    mesh2.position.copy(seq.v3Paths.paths['m2pos'] );
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
