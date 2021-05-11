
(function () {

    // Scene
    var scene = new THREE.Scene();

    var state = {
        lt: new Date(),
        fps: 24,
        world: new THREE.Group()
    };
    scene.add(state.world);

    // CREATING A BIPLANE and adding it to the world
    var bp = state.world.userData.bp = Biplane.create();
    state.world.add(bp);

    var ground = TileMod.create({
            w: 50,
            h: 50
        });
    ground.position.set(0, -5, 0);
    TileMod.setCheckerBoard(ground);
    state.world.add(ground);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(-15, 10, 10);
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
        secs = (now - state.lt) / 1000,
        wud = state.world.userData;
        requestAnimationFrame(animate);
        if (secs > 1 / state.fps) {
            Biplane.update(wud.bp, secs);
            renderer.render(scene, camera);
            state.lt = now;
        }
    };

    animate();

}
    ());
