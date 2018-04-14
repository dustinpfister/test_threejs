
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    //controls.autoRotate = true;
    //controls.autoRotateSpeed = 8;
    //controls.target = new THREE.Vector3(.5, .5, .5);

    //  horizontally angle control
    //controls.minAzimuthAngle = -Math.PI / 4;
    //controls.maxAzimuthAngle = Math.PI / 4;

    // vertical angle control
    //controls.minPolarAngle = -Math.PI / 2;
    //controls.maxPolarAngle = Math.PI / 2;
	
	//controls.enableDamping = true;
	//controls.dampingFactor = .2;

	console.log(controls.panningMode);
	//controls.panningMode = 1;
	
    // Something to look at
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            })));

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    function animate() {

        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);

    };

    animate();

}
    ());
