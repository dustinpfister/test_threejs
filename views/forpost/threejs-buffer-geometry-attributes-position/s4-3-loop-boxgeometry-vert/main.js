(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set location of a vert given an index value in geometry.index
    const setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        const posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
        position.needsUpdate = true;
    };
    // get bias
    const getBias = (n, d, count) => {
        const a = n / d * count % 1;
        return 1 - Math.abs(0.5 - a) / 0.5;
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(3, 3, 1);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // GEOMETRY, MESH
    //-------- ----------
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.FrontSide,
        wireframe: true
    }));
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a = frame / frameMax;
        const s = 1 * getBias(frame, frameMax, 8);
        const v1 = new THREE.Vector3(s, s, s);
        setVert(geometry, 0, v1);
        setVert(geometry, 16, v1);
        setVert(geometry, 26, v1);
        mesh.rotation.y = Math.PI * 2 * a;
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
