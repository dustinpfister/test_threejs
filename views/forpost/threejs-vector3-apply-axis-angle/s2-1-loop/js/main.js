(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // MESH
    // ---------- ---------- ----------
    const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 30, 30),
            new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(1, 0, 1);
    scene.add(mesh);
    // ---------- ---------- ----------
    // LOOP
    // ---------- ---------- ----------
    const v = new THREE.Vector3(0, 1, 0);
    const fps = 30;
    let lt = new Date();
    // update method
    const update = function (secs) {
        v.x += 0.25 * secs;
        v.x %= 1;
        const degree = 45 * secs;
        mesh.position.applyAxisAngle(v, Math.PI / 180 * degree);
        mesh.lookAt(0, 0, 0);
    };
    // loop method
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
}
    ());
