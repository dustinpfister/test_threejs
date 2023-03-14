(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set position of mesh based on vector unit length along with a and b values
    // relative to a standard start position
    const setByLength = function(mesh, len, a, b, startDir){
        startDir = startDir || new THREE.Vector3(1, 0, 0);
        const pi2 = Math.PI * 2,
        eul = new THREE.Euler(
            0, 
            a % 1 * pi2,
            b % 1 * pi2);
        // using copy to start at startDir, then applying the Euler. After that normalize and multiplyScalar
        return mesh.position.copy( startDir ).applyEuler( eul ).normalize().multiplyScalar(len);
    };
    // get a bias value
    const getBias = function(n, d, count){
        let per = n / d * count % 1;
        return 1 - Math.abs(0.5 - per) / 0.5;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    let frame = 0,
    maxFrame = 300,
    fps = 20,
    lt = new Date();
    const loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // USING SET BY LENGTH HELPER
            let len = 1 + 4 * getBias(frame, maxFrame, 6);
            let a = frame / maxFrame;
            let b = -0.125 + 0.25 * getBias(frame, maxFrame, 10);
            setByLength(mesh1, len, a, b);
            // look at, render, step, ...
            mesh1.lookAt(0, 0, 0);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
    ());