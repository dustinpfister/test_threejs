(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const appendLine = (mesh, color, lw, opacity ) => {
        const line_material = new THREE.LineBasicMaterial( {
            color: color|| 0xffffff,
            linewidth: lw === undefined ? 6 : lw,
            transparent: true,
            opacity: opacity === undefined ? 1 : opacity
        });
        const line = new THREE.LineSegments( mesh.geometry, line_material );
        mesh.add(line)
    };
    // ---------- ----------
    // Tetrahedron Geometry
    // ---------- ----------
    const geo = new THREE.TetrahedronGeometry(3, 0);
    // ---------- ----------
    // MESH
    // ---------- ----------
    const mesh_material1 = new THREE.MeshPhongMaterial( {
        color: 0x00ff88, flatShading: true,
        side: THREE.DoubleSide,
        transparent: true, opacity: 0.50 } );
    const mesh_material2 = new THREE.MeshPhongMaterial( {
        color: 0x00ff00, flatShading: true,
        transparent: true, opacity: 0.25
    });
    const mesh = new THREE.Mesh( geo, mesh_material1 );
    scene.add(mesh);
    appendLine(mesh);
    // sphere mesh
    const mesh_sphere = new THREE.Mesh( new THREE.SphereGeometry(3.0, 30, 30), mesh_material2);
    scene.add(mesh_sphere);
    appendLine(mesh_sphere, 0xffffff, 3, 0.2);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1.0);
    dl.position.set(3, 1, 2);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(al);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        mesh.rotation.y = Math.PI * 2 * a1;
        mesh.rotation.z = Math.PI * 4 * a1;
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());