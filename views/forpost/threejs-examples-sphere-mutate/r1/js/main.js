
(function () {

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.02,0.02,0.02)
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 0, 1);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 1, -2);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.1);
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
        const a1 = i / size;
        const a2 = i % width / width;
        const v = 30 + 70 * Math.random();
        data[ stride ] = v + 150 * a1;           // red
        data[ stride + 1 ] = v + 150 - 150 * a1; // green
        data[ stride + 2 ] = v + 50 * a2;        // blue
        data[ stride + 3 ] = 255;                // alpha
    }
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    // ---------- ----------
    // GEOMETRY, MESH
    // ---------- ----------
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 60, 60, 0, Math.PI * 1.75), 
        new THREE.MeshPhongMaterial({
                color: 'white',
                map: texture,
                side: THREE.DoubleSide
            }));
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const updateMeshGeo = (mesh) => {
        const geo = mesh.geometry;
        const pos = geo.getAttribute('position');
        const len = pos.count;
        let i = 0;
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
            v.normalize().multiplyScalar(0.25 + 0.3 * Math.random());
            pos.array[i * 3] = v.x;
            pos.array[i * 3 + 1] = v.y;
            pos.array[i * 3 + 2] = v.z;
            i += 1;
        }
        pos.needsUpdate = true;
    };
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
       updateMeshGeo(mesh)
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
