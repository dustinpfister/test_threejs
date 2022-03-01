(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 5000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 150, 0);
    cube.castShadow = true;
    scene.add(cube);
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(3000, 3000, 8, 8),
            new THREE.MeshStandardMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true; // the plane will receive a shadow
    scene.add(plane);
    // ---------- ----------
    // SPOTLIGHT
    // ---------- ----------
    var spotLight = new THREE.SpotLight(0xffffff);
    // I must at least set the caseShadow boolean
    // of the spotLight to true
    spotLight.castShadow = true;
    // additional shadow properties of interest
    spotLight.shadow.mapSize.width = 64;
    spotLight.shadow.mapSize.height = 64;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
    // additional spotlight properties of interest
    spotLight.intensity = 2;
    spotLight.penumbra = .5;
    spotLight.angle = Math.PI / 2.5;
    spotLight.distance = 1000;
    spotLight.position.set(-250, 350, 250);
    scene.add(spotLight);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());
