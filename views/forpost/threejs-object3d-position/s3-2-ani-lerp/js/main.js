(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // camera pos
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // get a value between 0 and 1 with the given numerator denominator and count
    const getAlpha = (n, d, ct) => {
        return THREE.MathUtils.euclideanModulo(n / d * ct, 1);
    };
    // getBias is like getAlpha but the value will 'pingpong', I often also refer to this as a 'bias' value
    const getBias = (n, d, ct) => {
        return THREE.MathUtils.pingpong(getAlpha(n, d, ct) - 0.5, 1) * 2;
    };
    // just passing a getBias call to THREE.MathUtils.smoothstep
    const getSmoothBias = (n, d, ct) => {
        return THREE.MathUtils.smoothstep(getBias(n, d, ct), 0, 1);
    }
    // make a single mesh object with custom user data
    const MESH_GEO = new THREE.SphereGeometry(0.5, 20, 20);
    const MESH_MATERIAL = new THREE.MeshNormalMaterial();
    const makeMesh = (opt) => {
        opt = opt || {};
        const mesh = new THREE.Mesh(
            MESH_GEO,
            MESH_MATERIAL);
        const ud = mesh.userData;
        ud.v_start = opt.v_start || new THREE.Vector3(-4, 0, -4);
        ud.v_end = opt.v_end || new THREE.Vector3(4, 0, -4);
        ud.v_add = opt.v_add || new THREE.Vector3(0, 0, 8);
        return mesh;
    };
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    const mesh = makeMesh();
    scene.add(mesh);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 900;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){

        const alpha = getSmoothBias(frame, frameMax, 4);
        const ud = mesh.userData;
        const delta = ud.v_add.clone().multiplyScalar( 1 - getSmoothBias(frame, frameMax, 8) );
        mesh.position.copy(ud.v_start).lerp(ud.v_end, alpha).add( delta );

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
}());