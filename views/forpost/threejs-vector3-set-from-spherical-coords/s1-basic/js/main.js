
(function () {

    var v = new THREE.Vector3(0,0,0);

    var phi = THREE.MathUtils.degToRad(54.74),
    theta = THREE.MathUtils.degToRad(45);
    v.setFromSphericalCoords(10, phi, theta);

    var p = document.createElement('p');
    p.innerText = v.x.toFixed(2) + ', ' + v.y.toFixed(2) + ',' + v.z.toFixed(2);
    document.body.appendChild(p);

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
