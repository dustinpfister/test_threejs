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
    const geo = new THREE.PlaneGeometry(10, 10, 20, 20);
    geo.rotateX(Math.PI * 1.5);
    // ---------- ----------
    // NORMAL ATTRIBUTE OF PLANE GEOMETRY
    // ---------- ----------
    const normal = geo.getAttribute('normal');
    let i = 0;
    const len = normal.count;
    while(i < len){
        const dx = -2 + 4 * Math.random(),
        dy = -2 + 4 * Math.random(),
        dz = -2 + 4 * Math.random();
        normal.setXYZ(i,
            normal.getX(i) +  Math.random() *  dx,
            normal.getY(i) +  Math.random() *  dy,
            normal.getZ(i) +  Math.random() *  dz
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
    if(THREE.VertexNormalsHelper){
        const helper = new THREE.VertexNormalsHelper( mesh, 1, 0x00af00 );
        scene.add(helper);
    }
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());