(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - Plane Geometry
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    mesh1.position.set(-2, 2, 0);
    // MESH2 IS USING THE THREE.DoubleSide OPTION
    // FOR THE MATERIAL
    var mesh2 = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshNormalMaterial({ side: THREE.DoubleSide}));
    mesh2.position.set(2, 2, 0);
    scene.add(mesh2);
    // ROTATION OF GEOMETRY
    var mesh3 = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshNormalMaterial({ side: THREE.DoubleSide}));
    mesh3.geometry.rotateX( Math.PI * 0.5 );
    mesh3.position.y = -0.025;
    scene.add(mesh3);
    // ---------- ----------
    // LOOP
    // ---------- ----------
    const fps_move = 30, fps_update = 12;
    let f = 0, fm = 300, lt = new Date();
    const loop = () => {
        const now = new Date();
        const secs = (now - lt) / 1000;
        const a = f / fm;
        requestAnimationFrame(loop);
        if(secs >= 1 / fps_update){
            mesh1.rotation.y = Math.PI * 8 * a;
            mesh2.rotation.y = Math.PI * 8 * a;
            mesh3.rotation.y = Math.PI * 2 * a;
            f += fps_move * secs;
            f %= fm;
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
}
    ());