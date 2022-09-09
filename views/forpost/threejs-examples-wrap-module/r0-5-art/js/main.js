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
    // HELPERS
    //-------- ----------
    // make a cone with the geometry adjusted so that it points to x+ by default
    const makeCone = (len, radius) => {
        len = len === undefined ? 3 : len;
        radius = radius === undefined ? 0.5 : radius;
        const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(radius, len, 20, 20),
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 1
            }));
        mesh.geometry.rotateX( Math.PI * 0.5 );
        mesh.geometry.rotateY( Math.PI * 0.5 );
        return mesh;
    };
    // make a cube
    const makeCube = (size) => {
        size = size === undefined ? 1 : size;
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 1
            }));
        return mesh;
    };
    // get an alpha value for a wrap
    const getWrapAlpha = (value, vMin, vMax) => {
        const range = Math.abs(vMax - vMin);
        // looks like I might have a one liner here...
        return Math.abs( vMin - wrapMod.wrap(value, vMin, vMax) ) / range;
    };
    //-------- ----------
    // MESH
    //-------- ----------
    var mesh1 = makeCube();
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    var dir = new THREE.Euler(0, 0, 1),
    unitsPerSec = 4,
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
            dir.y += Math.PI / 180 * 40 * secs;
            wrapMod.wrapEuler(dir);
            // figure delta
            let delta = new THREE.Vector3(0, 0, 1);
            delta = delta.applyEuler(dir).normalize().multiplyScalar(unitsPerSec * secs);
            // USING wrapMod main method to wrap mesh1.position
            mesh1.position.add(delta);
            wrapMod.wrapVectorLength(mesh1.position, 2.5, 4.5);
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