
(function () {

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.02,0.02,0.02)
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1.25, 0.25, 1.25);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 1, -2);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(al);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // create new vectors
    const createNewVectors = (mesh, mag) => {
        mag = mag === undefined ? 0.25 : mag
        const pos = mesh.userData.pos_base;
        const len = pos.count, vstart=[], vend= [];
        let i = 0;
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
            const ul = v.length();
            vstart.push(v);
            vend.push(v.clone().normalize().multiplyScalar(ul - mag + mag * 2 * Math.random()));
            i += 1;
        }
        mesh.userData.vstart = vstart;
        mesh.userData.vend = vend;
    };
    // create the mesh object
    const createMesh = () => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 40, 40, 0, Math.PI * 1.6), 
            new THREE.MeshPhongMaterial({
                color: 'white',
                map: texture,
                side: THREE.DoubleSide
            }));
        mesh.userData.pos_base = mesh.geometry.getAttribute('position').clone();
        createNewVectors(mesh);
        return mesh;
    };
    // update the mesh object
    const updateMeshGeo = (mesh, alpha) => {
        const geo = mesh.geometry;
        const pos = geo.getAttribute('position');
        const len = pos.count;
        const mud = mesh.userData;
        let i = 0;
        while(i < len){
            const v = mud.vstart[i].clone().lerp( mud.vend[i], alpha );
            pos.array[i * 3] = v.x;
            pos.array[i * 3 + 1] = v.y;
            pos.array[i * 3 + 2] = v.z;
            i += 1;
        }
        pos.needsUpdate = true;
    };
    //-------- ----------
    // TEXTURE
    //-------- ----------
    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    const width = 32, height = 32;
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
    const mesh = createMesh();
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        let alpha = frame / frameMax;
        let bias = 1 - Math.abs(0.5 - (alpha * 4 % 1)) / 0.5;
        if(frame === 0){
            createNewVectors(mesh, 0.05 + 0.20 * Math.random())
        }
        updateMeshGeo(mesh, bias);
        mesh.rotation.y = Math.PI * 4 * alpha;
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
