(function () {
    //******** **********
    // SCENE, CAMNERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    // camera DO NOT ADD TO SCENE
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();     // render
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // GRID HELPER AND MESH OBJECT
    //******** **********
    var gridHelper = new THREE.GridHelper(5, 5);
    scene.add(gridHelper);
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0.5, 0);
    scene.add(box);
    //******** **********
    // STATE OBJECT INCLDUING SHAKE OBJECT
    //******** **********
    var canvas = renderer.domElement;
    var state = {
        frame: 0,
        maxFrame: 3000,
        fps: 30,
        lt: new Date(),
        shake: ShakeMod.create() // ADJUSTING pos and DEG by EVENTS
    };
    //******** **********
    // EVENTS
    //******** **********
    var pointerDown = function () {
        state.shake.active = true;
    };
    var pointerUp = function () {
        state.shake.active = false;
    };
    var pointerMove = function (shake, canvas) {
        return function (e) {
            e.preventDefault();
            var canvas = e.target,
            box = canvas.getBoundingClientRect(),
            x = e.clientX - box.left,
            y = e.clientY - box.top;
            if (e.changedTouches) {
                x = e.changedTouches[0].clientX - box.left;
                y = e.changedTouches[0].clientY - box.top;
            };
            // Adjust pos and deg based on pointer position
            shake.pos = x / canvas.width * 0.95;
            shake.deg = y / canvas.height * 18;
        };
    };
    // mouse
    renderer.domElement.addEventListener('mousedown', pointerDown);
    renderer.domElement.addEventListener('mousemove', pointerMove(state.shake, canvas));
    renderer.domElement.addEventListener('mouseup', pointerUp);
    renderer.domElement.addEventListener('mouseout', pointerUp);
    // touch
    renderer.domElement.addEventListener('touchstart', pointerDown);
    renderer.domElement.addEventListener('touchmove', pointerMove(state.shake, canvas));
    renderer.domElement.addEventListener('touchend', pointerUp);
    renderer.domElement.addEventListener('touchcancel', pointerUp);
    //******** **********
    // UPDATE AND LOOP
    //******** **********
    var update = function (state, secs) {
        if (state.shake.active) {
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
