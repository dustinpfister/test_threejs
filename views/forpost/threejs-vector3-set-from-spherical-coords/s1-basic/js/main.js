
(function () {

    var v = new THREE.Vector3(0,0,0);

    var phi = THREE.MathUtils.degToRad(90),
   theta = THREE.MathUtils.degToRad(90);

    v.setFromSphericalCoords(10, phi, theta);

    console.log(v);

/*
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');

    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    scene.add(pl);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);
	*/

}
    ());
