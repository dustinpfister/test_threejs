(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0 ,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // CYlinder Geometry set up to result in a kind of Tetrahedron
    // ---------- ----------
    const geo = new THREE.CylinderGeometry(0, 1, 2, 3, 1, true);
    geo.rotateX(Math.PI * 0.5);
    // ---------- ----------
    // MESH AND POINTS
    // ---------- ----------
    const mesh_material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh( geo, mesh_material );
    scene.add(mesh);
    const points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.25}));
    mesh.add(points);
    mesh.position.set(0,0,0);
    mesh.lookAt(10,0,0);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    // loop
    const loop = () => {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}());