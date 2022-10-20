(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // PLANE GEOMETRY
    // ---------- ----------
    const geo = new THREE.PlaneGeometry(10, 10, 5, 5);
    geo.rotateX(Math.PI * 1.5);
    geo.translate(0,-1,0);
    // ---------- ----------
    // POSITION ATTRIBUTE OF PLANE GEOMETRY
    // ---------- ----------
    const pos = geo.getAttribute('position');
    let i = 0;
    const len = pos.count;
    // for each point adjusting y value
    while(i < len){
        console.log(pos.getY(i))
        pos.setY(i, -2 + 4 * Math.random());
        i += 1;
    }
    pos.needsUpdate = true;
    // recompute the 'normals' attribute
    geo.computeVertexNormals()
    // ---------- ----------
    // MESH
    // ---------- ----------
    const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }));
    scene.add(mesh);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());