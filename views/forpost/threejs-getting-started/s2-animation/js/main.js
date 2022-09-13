(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    let scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),
    renderer = new THREE.WebGLRenderer();
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // ADD A MESH
    // ---------- ---------- ----------
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // ---------- ---------- ----------
    // ANIMATION LOOP
    // ---------- ---------- ----------
    camera.position.set(250, 250, 250);
    camera.lookAt(0,0,0);
    renderer.setSize(640, 480);
    let degree = 0, degreesPerSecond = 90, lt = new Date();
    let loop = function(){
        let now = new Date(), secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        degree += degreesPerSecond * secs;
        degree %= 360;
        mesh.rotation.x = THREE.MathUtils.degToRad(degree);
        renderer.render(scene, camera);
        lt = now;
    };
    loop();
}());