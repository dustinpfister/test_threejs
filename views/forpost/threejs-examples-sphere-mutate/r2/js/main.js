// threejs-examples-sphere-mutate - r1 - random vector unit length with same direction
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
    // HELPERS
    // ---------- ----------
    // create the mesh object
    const createMesh = (texture) => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 60, 60, 0, Math.PI * 2), 
            new THREE.MeshPhongMaterial({
                color: 'white',
                map: texture || null,
                side: THREE.DoubleSide
            }));
        const pos = mesh.geometry.getAttribute('position');
        mesh.userData.pos = pos;
        mesh.userData.pos_base = pos.clone();
        return mesh;
    };
    // ---------- ----------
    // GEOMETRY, MESH
    // ---------- ----------
    const mesh = createMesh();
    scene.add(mesh);
    camera.lookAt(mesh.position);
 
    // mutate
    const geo = mesh.geometry;
    const pos = mesh.userData.pos;
    const pos_base = mesh.userData.pos_base; 
    let i = 0;
    const w = geo.parameters.widthSegments
    const h = geo.parameters.heightSegments;
    while(i < pos.count){
        const x = i % ( w + 1);
        const y = Math.floor(i / ( h + 1) );
        if(y === 0 || y === h){
            // do something special for top and bottom points
        }else{
            if(x < w){
                const vs = new THREE.Vector3(pos_base.getX(i), pos_base.getY(i), pos_base.getZ(i));
                const v = vs.clone().normalize().multiplyScalar(0.5 + 0.95 * Math.random());
                pos.setXYZ(i, v.x, v.y, v.z);
            }else{
                // deal with seam
                const i2 = y * ( h + 1 );
                pos.setXYZ( i, pos.getX(i2), pos.getY(i2), pos.getZ(i2) )
            }
        }
        i += 1;
    }
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
