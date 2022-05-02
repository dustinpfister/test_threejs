(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    var camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.05, 100);
    camera.position.set(25, 25, 25);
    camera.lookAt(0, -5, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CUBE STACK GRID
    var soPalette = [
        { boxCount: 3 },
        { boxCount: 10 },
        { boxCount: 15 },
        { boxCount: 20 }
    ];
    var sopArray = [
        0,0,0,0,0,
        0,1,2,1,0,
        0,2,3,2,0,
        0,1,2,1,0,
        0,0,0,0,0
    ];
    var csg = CubeStackGrid.create({ gw: 5, gh: 5, stackOptionPalette: soPalette, sopArray: sopArray});
    scene.add(csg);
    console.log(csg)

    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    renderer.render(scene, camera);
/*
    var frame = 0,
    maxFrame = 300,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // apply effect
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
*/

}
    ());
