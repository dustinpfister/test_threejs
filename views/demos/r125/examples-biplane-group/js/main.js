
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 10);

    // light
    var pointLight = new THREE.PointLight('white');
    pointLight.position.set(28, 20, 40);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    scene.add(pointLight);

    var bi1 = Biplane.create();
    scene.add(bi1);

    var materials = {
        plane: new THREE.MeshLambertMaterial({
            color: 0xff0000
        })
    },
    bi2 = Biplane.create({
        materials: materials
    });
    bi2.userData.propRPS = 2;
    bi2.position.set(0,0,15);
    scene.add(bi2);


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
        Biplane.update(bi1, secs);
        Biplane.update(bi2, secs);
        controls.update();
        renderer.render(scene, camera);
        lt = now;
    };

    animate();

}
    ());
