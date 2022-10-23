// threejs-examples-sphere-mutate - r2 
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDRER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.02,0.02,0.02)
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2,2,2);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(3, 1, -2);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(al);
    // ---------- ----------
    // GEOMETRY, MESH
    // ---------- ----------
    const mesh = sphereMutate.create();
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // update options
    const updateOpt = {
        forPoint : function(vs, i, x, y, mesh){
            const mud = mesh.userData;
            const state = mud.state = mud.state === undefined ? [] : mud.state;

            if(!state[i]){
                state[i] = {
                    v: vs.clone().normalize().multiplyScalar(0.8 + 0.4 * Math.random()),
                    f: Math.floor( Math.random() * 50 )
                };
            }else{


            }

            const alpha = state[i].f / 50;
            const alpha2 = 1 - Math.abs(0.5 - alpha) / 0.5;
            state[i].f += 1;
            state[i].f %= 50;

            return vs.lerp(state[i].v, alpha2);
        }
    };
    sphereMutate.update(mesh, updateOpt);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        let alpha = frame / frameMax;
        //mesh.rotation.y = Math.PI * 2 * alpha;
       // mesh.rotation.x = Math.PI * 4 * alpha;

    sphereMutate.update(mesh, updateOpt);

    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}
    ());
