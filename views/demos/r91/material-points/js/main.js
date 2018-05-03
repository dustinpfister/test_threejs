
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    var pointsGeometry = new THREE.Geometry();
    var i = 0;
    while (i < 500) {

        var star = new THREE.Vector3();
        star.set(
            THREE.Math.randFloatSpread(1),
            THREE.Math.randFloatSpread(3),
            THREE.Math.randFloatSpread(3));

        pointsGeometry.vertices.push(star);

        i += 1;

    }

    var starsMaterial = new THREE.PointsMaterial({
            color: 0x00afaf
        });

    var starField = new THREE.Points(pointsGeometry, starsMaterial);

    scene.add(starField);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var loop = function () {

        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);

    };

    loop();

}
    ());
