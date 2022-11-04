(function () {
    // ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10 ));
    scene.background = new THREE.Color(0.5, 0.5, 0.5);
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const mkCanvasOpt = (palette) => {
        const canOpt = {
            draw: 'rnd', 
            update_mode: 'canvas', 
            palette: palette || ['white', 'black'], 
            size: 128, 
            state:{ gSize: 16 } };
        return canOpt;
    };
    // ---------- ----------
    // CREATE AND UPDATE MESH
    // ---------- ----------
    // create the mesh object
    const mesh = uvMapCube.create({
        images: [ 
            canvasMod.create( mkCanvasOpt() ).canvas,
            canvasMod.create( mkCanvasOpt(['red', 'blue', 'purple']) ).canvas
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