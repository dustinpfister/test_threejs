(function () {
 
    var createCube = function (rotationRates, position) {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        var ud = cube.userData;
        ud.rotationRates = rotationRates || [0, 3.14, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };
 
    var clampRadian = function (radian) {
        return radian %= Math.PI * 2;
    };
 
    var updateCube = function (cube, secs) {
        var ud = cube.userData,
        rr = ud.rotationRates;
        cube.rotation.x += rr[0] * secs;
        cube.rotation.y += rr[1] * secs;
        cube.rotation.z += rr[2] * secs;
        cube.rotation.x = clampRadian(cube.rotation.x);
        cube.rotation.y = clampRadian(cube.rotation.y);
        cube.rotation.z = clampRadian(cube.rotation.z);
    };
 
    // Scene
    var scene = new THREE.Scene();
 
    // add some cubes
    var cubes = new THREE.Group();
    cubes.add(createCube([1.57, 0.00, 0.00], new THREE.Vector3(3, 0, 0)));
    cubes.add(createCube([3.14, 1.57, 0.25], new THREE.Vector3(0, 0, 0)));
    cubes.add(createCube([0.00, 0.00, 6.28], new THREE.Vector3(-3, 0, 0)));
    scene.add(cubes);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            cubes.children.forEach(function (cube) {
                updateCube(cube, secs);
            });
            renderer.render(scene, camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());