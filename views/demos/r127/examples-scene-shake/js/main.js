(function () {
    // scene and grid helper
    var scene = new THREE.Scene();
    var gridHelper = new THREE.GridHelper(5, 5);
    scene.add(gridHelper);

    // box is a MESH base off of OBJECT3D
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0.5, 0);
    scene.add(box);

    // camera DO NOT ADD TO SCENE
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // state object
    var state = {
        frame: 0,
        maxFrame: 3000,
        fps: 30,
        lt: new Date(),
        shake: ShakeMod.create({
            deg: 5.25,
            pos: 0.1,
            active: true
        })
    };
    var pointerDown = function () {
        state.shake.active = false;
    };
    var pointerUp = function () {
        state.shake.active = true;
    };
    renderer.domElement.addEventListener('mousedown', pointerDown);
    renderer.domElement.addEventListener('mouseup', pointerUp);
    // update
    var update = function (state, secs) {

        if (state.shake.active) {
            state.shake.pos = 0.05 + 1.9 * state.bias;
            state.shake.deg = 0.50 + 18 * state.bias;
            ShakeMod.roll(state.shake);
        } else {
            state.frame = 0;
        }
        //ShakeMod.update(state.shake, secs);
        ShakeMod.applyToObject3d(state.shake, scene);
    };
    // loop
    var loop = function () {
        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        var now = new Date();
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {
            update(state, secs);
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
