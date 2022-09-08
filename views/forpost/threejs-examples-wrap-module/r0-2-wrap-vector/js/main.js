(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    var dir = new THREE.Euler(0, 0, 1),
    unitsPerSec = 2,
    vecMin = new THREE.Vector3(-4.5,-4.5,-4.5),
    vecMax = new THREE.Vector3(4.5,4.5,4.5),
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // update dir
            dir.x += Math.PI / 180 * 5 * secs;
            dir.y += Math.PI / 180 * 45 * secs;
            // figure delta
            let delta = new THREE.Vector3(0, 0, 1);
            delta = delta.applyEuler(dir).normalize().multiplyScalar(unitsPerSec * secs);
            // USING wrapMod main method to wrap mesh1.position
            mesh1.position.add(delta);
            wrapMod(mesh1.position, vecMin, vecMax);
            mesh1.lookAt(0, 0, 0);
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());