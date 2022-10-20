(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - Making Mesh Object with TileMod module r0
    // ---------- ----------
    const plane = TileMod.create({
        w: 10,
        h: 10,
        sw: 4,
        sh: 4
    });
    // set checkerBoard material index values
    TileMod.setCheckerBoard(plane);
    scene.add(plane);
    const plane2 = TileMod.create({
        w: 10,
        h: 10,
        sw: 8,
        sh: 8
    });
    // set checkerBoard material index values
    TileMod.setBoxBoard(plane2);
    plane.position.set(-11, 0, 0);
    scene.add(plane2);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
