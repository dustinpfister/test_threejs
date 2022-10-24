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
    // ---------- ----------
    // GEOMETRY, MESH
    // ---------- ----------
    const mesh = sphereMutate.create({
        size: 1.25, w: 60, h: 60, material: new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth : 3})
    });
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // update options
    const updateOpt = {
        forPoint : function(vs, i, x, y, mesh, alpha){
            const geo = mesh.geometry;
            const w = geo.parameters.widthSegments;
            const h = geo.parameters.heightSegments;
            const mud = mesh.userData;
            const a1 = x / w;
            const a2 = y / h;
            const radian1 = Math.PI * 16 * a1 + Math.PI * (2 + 16 * a2) * alpha;
            const radian2 = Math.PI * 16 * a2 + Math.PI * 8 * alpha;
            const n1 = ( Math.PI + Math.sin( radian1 ) ) / Math.PI;
            const n2 = ( Math.PI + Math.sin( radian2 ) ) / Math.PI;
            const n3 = ( n1 + n2 ) / 2;
            const v2 = vs.clone().normalize().multiplyScalar( vs.length() + 0.2 * n3 )
            return vs.lerp(v2, 1 - Math.abs(0.5 - alpha) / 0.5);
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
