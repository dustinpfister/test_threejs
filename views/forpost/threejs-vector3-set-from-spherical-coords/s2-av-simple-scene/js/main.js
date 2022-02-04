
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');

    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);

    // point light
    //var pl = new THREE.PointLight(0xffffff);
    //pl.position.set(2, 5, 3);
    //camera.add(pl);
    //scene.add(pl);

    // A Mesh with a Sphere for geometry and using the Standard Material
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 30, 30),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('red')
        })
    );
    scene.add(mesh);

    var v = new THREE.Vector3(0,0,0);
    var phi = THREE.MathUtils.degToRad(54.74),
    theta = THREE.MathUtils.degToRad(45);
    v.setFromSphericalCoords(10, phi, theta);

    renderer.render(scene, camera);

}
    ());
