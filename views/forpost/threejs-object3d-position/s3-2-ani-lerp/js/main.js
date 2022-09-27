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
    camera.position.set(6, 9, 6);
    camera.lookAt(1.4, 0, 1.4);
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
    const MESH_GEO = new THREE.SphereGeometry(0.75, 20, 20);
    const makeMesh = (opt) => {
        opt = opt || {};
        const mesh = new THREE.Mesh(
            MESH_GEO,
            new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 }));
        const ud = mesh.userData;
        ud.v_start = opt.v_start || new THREE.Vector3(-4, 0, -4);
        ud.v_end = opt.v_end || new THREE.Vector3(4, 0, -4);
        ud.v_add = opt.v_add || new THREE.Vector3(0, 0, 8);
        return mesh;
    };
    const updateMesh = (mesh, opt) => {
        opt = opt || {};
        opt.alphaLerp = opt.alphaLerp === undefined ? 0 : opt.alphaLerp;
        opt.alphaAdd = opt.alphaAdd === undefined ? 1 - getSmoothBias(opt.alphaLerp, 1, 1) : opt.alphaAdd;
        //const alpha = getSmoothBias(frame, frameMax, 4);
        const ud = mesh.userData;
        const delta = ud.v_add.clone().multiplyScalar( opt.alphaAdd );
        mesh.position.copy(ud.v_start).lerp(ud.v_end, opt.alphaLerp).add( delta );
    }
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    const group = new THREE.Group();
    const len = 18;
    let i = 0;
    while(i < len){
        const alpha = i / len;
        const mesh = makeMesh({
            v_add: new THREE.Vector3(0, 4, 8)
        });
        group.add(mesh);
        i += 1;
    }
    scene.add(group);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        group.children.forEach((mesh, i, arr)=>{
            let alpha1 =  1 - getSmoothBias(frame, frameMax, 4),
            alpha2 = getAlpha( alpha1 - 0.75 * ( i / arr.length ), 1, 1);
            updateMesh(mesh, {
                alphaLerp: alpha2,
                alphaAdd: 1 - getSmoothBias(alpha2, 1, 2 * alpha1)
            });
            // opacity
            let alphaEffect = 1 - getSmoothBias(alpha2, 1, 1);
            mesh.material.opacity = alphaEffect;
            // scale
            let s = 0.25 + 0.75 * alphaEffect;
            mesh.scale.set(s, s, s);
        });
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