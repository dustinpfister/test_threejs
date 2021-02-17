
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);

    // light
    var pointLight = new THREE.PointLight('white');
    pointLight.position.set(14, 10, 20);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    scene.add(pointLight);

    var bi1 = Biplane.create();
    console.log(bi1);
    scene.add(bi1);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    var lt = new Date();
    function animate() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(animate);
        controls.update();
        Biplane.update(bi1, secs);
        renderer.render(scene, camera);
        lt = now;
    };

    animate();

}
    ());
