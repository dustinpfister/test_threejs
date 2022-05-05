(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    var camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.05, 1000);
    camera.position.set(25, 25, 25);
    camera.lookAt(0, -5, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(16 * 60,  9 * 60);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // CUBE STACK GRID
    // ********** **********
    var soPalette = [
        { boxCount: 3, colors: [ [0,1,0, [64, 255]], [0,1,1, [64, 255]] ], planeColor: 1 },
        { boxCount: 20 },
        { boxCount: 60 },
        { boxCount: 120, colors: [ [1,0,0, [64, 255]], [1,1,0, [64, 255]] ] },
        { boxCount: 80, colors: [ [1,0,0, [64, 255]], [1,1,0, [64, 255]] ] }
    ];
    var sopArray = [
        4,4,4,4,4,4,4,4,4,4,
        2,2,2,2,2,3,2,2,2,2,
        1,1,1,1,1,2,1,1,1,1,
        0,0,0,0,1,1,1,1,0,0,
        0,0,0,0,1,1,1,1,1,0,
        0,0,0,0,1,2,2,2,1,0,
        0,1,0,0,1,2,3,2,1,0,
        0,1,1,1,0,2,2,2,1,0,
        0,0,0,0,1,1,1,0,1,0,
        0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,1,0,0,0,0,
        0,1,1,1,2,1,0,0,0,0,
        1,1,1,2,1,1,1,0,0,0,
        1,1,2,2,2,1,1,0,0,0,
        1,1,2,3,2,1,1,0,0,0
    ];
    var csg = CubeStackGrid.create({ gw: 10, gh: 15, stackGW: 7, stackGH: 5, stackOptionPalette: soPalette, sopArray: sopArray});
    scene.add(csg);
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
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
             //csg.rotation.y = Math.PI * 2 * per
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();

}
    ());
