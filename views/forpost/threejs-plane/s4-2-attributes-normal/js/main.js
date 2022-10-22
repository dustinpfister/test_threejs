(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // PLANE GEOMETRY
    // ---------- ----------
    const geo = new THREE.PlaneGeometry(10, 10, 5, 5);
    geo.rotateX(Math.PI * 1.5);
    // ---------- ----------
    // NORMAL ATTRIBUTE OF PLANE GEOMETRY
    // ---------- ----------
    const normal = geo.getAttribute('normal');
    let i = 0;
    const len = normal.count;
    while(i < len){
        let x = normal.getX(i);
        let y = normal.getY(i);
        let z = normal.getZ(i);
        x = x + Math.random() * 2;
        normal.setXYZ(i, 
            x + -16 + Math.random() * 32,
            y + -16 + Math.random() * 32,
            z + -16 + Math.random() * 32
        );
        i += 1;
    }
    normal.needsUpdate = true;
    // ---------- ----------
    // MESH
    // ---------- ----------
    const mesh = new THREE.Mesh( geo,
        new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }));
    scene.add(mesh);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());