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
    // Tetrahedron Geometry
    // ---------- ----------
    const geo = new THREE.TetrahedronGeometry(5, 0);
    // adjusting rotation
    geo.rotateY( Math.PI * 0.25);
    geo.rotateZ( Math.PI * -0.19555 );

    //geo.rotateY( Math.PI / 4 );
    //geo.rotateZ( Math.PI / 3 );

    //geo.rotateX(Math.PI / 180 * 315);
    //geo.rotateY(Math.PI / 180 * 45);
    //geo.rotateZ(Math.PI / 180 * -35.2);
    // ---------- ----------
    // GROUP - made of mesh and line
    // ---------- ----------
    // materials
    const line_material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 3 } );
    const mesh_material = new THREE.MeshPhongMaterial( { color: 0x00ff88, flatShading: true } );
    // Group, Mesh, LineSegments
    const group = new THREE.Group();
    const line = new THREE.LineSegments( geo, line_material );
    group.add(line);
    const mesh = new THREE.Mesh( geo, mesh_material );
    group.add(mesh);
    scene.add(group);
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
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
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