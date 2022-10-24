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
    dl.position.set(2, 3, 1);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(al);
    //-------- ----------
    // TEXTURE
    //-------- ----------
    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    const width = 512, height = 512;
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4;
        //const a1 = i / size;
        //const a2 = i % width / width;
        const v = 30 + 70 * Math.random();
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    // ---------- ----------
    // GEOMETRY, MESH
    // ---------- ----------
    const mesh = sphereMutate.create(1.25, 40, 40, texture);
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // update options
    const updateOpt = {
        forPoint : function(vs, i, x, y, mesh, alpha){
            const mud = mesh.userData;
            const state = mud.state = mud.state === undefined ? [] : mud.state;
            if(!state[i]){
                state[i] = {
                    v: vs.clone().normalize().multiplyScalar(1.25 + 0.25 * Math.random()),
                    count: 1 + Math.floor( Math.random() * 9 ),
                    offset: Math.random()
                };
            }
            const alpha2 = (state[i].offset + state[i].count * alpha) % 1;
            const alpha3 = 1 - Math.abs(0.5 - alpha2) / 0.5;
            return vs.lerp(state[i].v, alpha3);
        }
    };
    sphereMutate.update(mesh, 0, updateOpt);
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
        mesh.rotation.y = Math.PI * 2 * alpha;
        sphereMutate.update(mesh, alpha * 4 % 1, updateOpt);
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
