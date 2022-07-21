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
        maxFrame: 300,
        fps: 30,
        lt: new Date(),
        shake: ShakeMod.create({
            obj: scene,
            posRange: [0.25, 0.5],
            degRange: [5, 20],
            intensity: 1.0,
            active: true
        })
    };
    //******** **********
    // UPDATE AND LOOP
    //******** **********
    var update = function (state, secs) {
        ShakeMod.update(state.shake);
    };
    // loop
    var loop = function () {
        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        var now = new Date();
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {
            // changing intesnity value over time
            state.shake.intensity = state.bias;
            // update, render, step frame
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
