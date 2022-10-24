// threejs-examples-sphere-mutate - r2 
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDRER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.02,0.02,0.02)
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1.5, 1.5, 1.5);
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
    const width = 64, height = 64;
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4;
        const v = 30 + 110 * Math.random();
        data[ stride ] = 0;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = 0
        data[ stride + 3 ] = 255;
    }
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    // ---------- ----------
    // GEOMETRY, MESH
    // ---------- ----------
    const mesh = sphereMutate.create({
        size: 0.25, w: 128, h: 128, texture: texture
    });
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // MAP DATA
    const map_w = 16;
    const map_data = [
        1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,0,4,3,0,0,1,1,0,0,3,4,0,0,1,
        1,0,0,5,2,0,0,1,1,0,0,2,5,0,0,1,
        2,0,0,5,1,0,0,2,2,0,0,1,5,0,0,2,
        3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,3,
        4,0,0,0,0,0,0,4,4,0,0,0,0,0,0,4,
        5,4,3,2,2,3,4,5,5,4,3,2,2,3,4,5,
        5,4,3,2,2,3,4,5,5,4,3,2,2,3,4,5,
        4,0,0,0,0,0,0,4,4,0,0,0,0,0,0,4,
        3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,3,
        2,0,0,5,1,0,0,2,2,0,0,1,5,0,0,2,
        1,0,0,5,2,0,0,1,1,0,0,2,5,0,0,1,
        1,0,0,4,3,0,0,1,1,0,0,3,4,0,0,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1
    ];
    // update options
    const updateOpt = {
        forPoint : function(vs, i, x, y, mesh, alpha){
            const geo = mesh.geometry;
            const w = geo.parameters.widthSegments;
            const h = geo.parameters.heightSegments;
            // get grid location
            const gx = Math.floor( x / w * map_w );
            const gy = Math.floor( ( y - 1 ) / ( h - 1) * map_w );
            const gi = gy * map_w + gx;
            const dy = map_data[gi];

            const ulb = 0.25 + 0.75 * alpha;
            const uld = 0.75 - 0.75 * alpha
            return vs.normalize().multiplyScalar(ulb + dy / 5 * uld);
        }
    };
    sphereMutate.update(mesh, 0, updateOpt);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 200;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        let alpha = frame / frameMax;
        let b = 1 - Math.abs( 0.5 - alpha ) / 0.5;
        sphereMutate.update(mesh, b, updateOpt);
        mesh.rotation.y = Math.PI * 2 * alpha;
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
