
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    var pointsGeometry = new THREE.Geometry();
    var i = 0;
    while (i < 500) {

        var star = new THREE.Vector3();
        star.set(
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45));

        pointsGeometry.vertices.push(star);

        i += 1;

    }

	scene.add(new THREE.Points(pointsGeometry, new THREE.PointsMaterial({color: 0x00afaf})));
	
    //scene.add(new THREE.Points(new THREE.SphereGeometry(20, 50, 50), new THREE.PointsMaterial({color: 0x00afaf})));

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
