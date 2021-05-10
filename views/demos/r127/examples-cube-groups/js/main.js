
(function () {

    var scene = new THREE.Scene();

    var gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    var cubes1 = CubeGroupMod.create({maxFrame: 50, fps: 30, rotations:[0,1,0]});
    cubes1.position.set(4,0,4);
    scene.add(cubes1);

    var cubes2 = CubeGroupMod.create({maxFrame: 50, fps: 1});
    cubes2.position.set(-4,0,4);
    scene.add(cubes2);

    var cubes3 = CubeGroupMod.create({
       anglesA:[180, 270, 90, 0],
       yDelta: 1.25,
       xzDelta: 0.75,
       maxFrame: 180,
       fps: 30,
       cubeRotations: [
          [0, 0, 1],
          [0, 1, 0],
          [0, 1, 1],
          [1, 0, 0],
          [1, 0, 1],
          [1, 1, 0],
          [1, 1, 1],
          [0, 0, 1]
       ],
       rotations: [1, 1, 1]
    });
    scene.add(cubes3);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
   
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            CubeGroupMod.update(cubes1, secs);
            CubeGroupMod.update(cubes2, secs);
            CubeGroupMod.update(cubes3, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };

    loop();

}
    ());
