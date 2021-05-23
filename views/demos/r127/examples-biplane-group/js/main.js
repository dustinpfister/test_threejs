
(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(1000, 100, 0xff0000, 0x4a4a00));

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 1000);
    camera.position.set(40, 40, 180);

    // light
    var pointLight = new THREE.PointLight('white');
    pointLight.position.set(28, 20, 40);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    scene.add(pointLight);

    // add AmbientLight
    var light = new THREE.AmbientLight(0xffffff);
    light.intensity = 0.1;
    scene.add(light);

    var biGroups = [];

    var i = 0,
    group;
    while (i < 3) {
        group = BiplaneGroup.create();
        group.position.z = 50 * i;
        biGroups.push(group);
        scene.add(group);
        i += 1;
    }

    group = biGroups[1];
    group.position.x = 30;
    var bi = group.children[0];
    bi.userData.rotate = true;
    bi.userData.rSpeed = 90;

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
        biGroups.forEach(function (biGroup) {

                BiplaneGroup.update(biGroup, secs);
            
        });
        controls.update();
        renderer.render(scene, camera);
        lt = now;
    };

    animate();

}
    ());
