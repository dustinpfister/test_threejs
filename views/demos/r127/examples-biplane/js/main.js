
(function () {

    var utils = {};

    utils.pi2 = Math.PI * 2;

    utils.getPerValues = function (frame, maxFrame, base) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 100 : maxFrame;
        base = base || 2;
        var per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        return {
            frame: frame,
            maxFrame: maxFrame,
            fps: 30,
            per: per,
            bias: bias,
            base: base,
            biasLog: Math.log(1 + bias * (base - 1)) / Math.log(base)
        };
    };

    // mathematical modulo
    utils.mod = function (x, m) {
        return (x % m + m) % m;
    };

    utils.normalizeRadian = function (radian) {
        return utils.mod(radian, utils.pi2);
    };

    var worldMod = {};

    worldMod.update = function (world, frame, maxFrame) {
        var wud = world.userData;
        wud.perObj = utils.getPerValues(frame, maxFrame);
        // biplane
        Biplane.update(wud.bp, wud.perObj.per);
        var radian1 = utils.normalizeRadian(utils.pi2 * wud.perObj.per),
        radian2 = utils.normalizeRadian(radian1 + Math.PI / 180 * 1 + Math.PI * 1.5);
        wud.bp.position.set(
            Math.cos(radian1) * 30,
            5,
            Math.sin(radian1) * 30);
        wud.bp.lookAt(new THREE.Vector3(
                Math.cos(radian2) * 10,
                0,
                Math.sin(radian2) * 10));
        // camrea
        wud.camera.lookAt(bp.position);
    };

    // Scene
    var scene = new THREE.Scene();

    // create state
    var state = {
        lt: new Date(),
        fps: 30,
        frame: 0,
        maxFrame: 600,
        world: new THREE.Group()
    };
    scene.add(state.world);

    // CREATING A BIPLANE and adding it to the world
    var bp = state.world.userData.bp = Biplane.create();
    state.world.add(bp);

    // Camera
    var camera = state.world.userData.camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(-15, 10, 0);
    //camera.lookAt(bp.position);
    bp.add(camera);

    // update for first time
    worldMod.update(state.world, state.frame, state.maxFrame);

    var ground = TileMod.create({
            w: 80,
            h: 80
        });
    ground.position.set(0, -5, 0);
    TileMod.setCheckerBoard(ground);
    state.world.add(ground);

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
            worldMod.update(state.world, state.frame, state.maxFrame);
            renderer.render(scene, state.world.userData.camera);
            state.lt = now;
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    };

    animate();

}
    ());
