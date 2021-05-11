
(function () {

    // Scene
    var scene = new THREE.Scene();

    var state = {
        lt: new Date(),
        fps: 24,
        bp: null
    };

    // CREATING A BIPLANE
    var bp = state.bp = Biplane.create();
    scene.add(bp);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(-15, 15, 0);
    camera.lookAt(bp.position);
    bp.add(camera);

    // light
    var pointLight = new THREE.PointLight('white');
    pointLight.position.set(28, 20, 40);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    scene.add(pointLight);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    function animate() {
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(animate);
        if (secs > 1 / state.fps) {
            Biplane.update(state.bp, secs);
            renderer.render(scene, camera);
            state.lt = now;
        }
    };

    animate();

}
    ());
