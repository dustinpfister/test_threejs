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
    // MESH - USING PLANE GEOMETRY, SETTING SIZE
    // ---------- ----------
    var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 4),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());