
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 1000);
    camera.position.set(40, 40, 180);
    //camera.lookAt(0, 0, 30);

    // light
    var pointLight = new THREE.PointLight('white');
    pointLight.position.set(28, 20, 40);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    scene.add(pointLight);

    var biGroups = [];

    var i = 0;
    while(i < 3){
        var group = BiplaneGroup.create();
        group.position.z = 50 * i;
        biGroups.push(group);
        scene.add(group);
        i += 1;
    }

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
        BiplaneGroup.update(biGroups[1], secs);
        controls.update();
        renderer.render(scene, camera);
        lt = now;
    };

    animate();

}
    ());
