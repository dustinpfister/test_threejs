(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // CREATE AND UPDATE MESH
    // ---------- ---------- ----------
    // create the mesh object
    let mesh = uvMapCube.create({
        images: [ 
            canvasMod.create({ draw: 'rnd', update_mode: 'canvas', palette: ['lime', 'green'], size: 128, state:{gSize: 16} } ).canvas,
            canvasMod.create({ draw: 'rnd', update_mode: 'canvas', palette: ['red', 'blue', 'purple'], size: 128, state:{gSize: 16} } ).canvas
        ]
    });
    scene.add(mesh);
    // I can now use the draw face method
    uvMapCube.drawFace(mesh, 'front', {i:1, sx: 0, sy: 0, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'top', {i:1, sx: 0, sy: 0, sw: 128, sh: 128});
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}());