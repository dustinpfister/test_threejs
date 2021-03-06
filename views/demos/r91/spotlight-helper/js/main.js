
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 5000);
    camera.position.set(800, 800, 800);
    camera.lookAt(0, 0, 0);

    // CUBE
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshStandardMaterial({
                color: 0xaffe00,
                emissive: 0x0a0a0a,
                side: THREE.DoubleSide
            }));
    cube.position.set(0, 150, 0);
    cube.castShadow = true;
    scene.add(cube);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.getElementById('demo').appendChild(renderer.domElement);

    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);

    spotLight.castShadow = true;
    spotLight.position.set(-250, 350, 250);

    spotLight.intensity = 2;
    spotLight.penumbra = .5;
    spotLight.angle = Math.PI / 5;
    spotLight.distance = 1500;

    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(3000, 3000, 8, 8),
            new THREE.MeshStandardMaterial({
                color: 0x00afaf,
                emissive: 0x202020,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // INIT
    renderer.setSize(320, 240);

    // LOOP
    var frame = 0,
    maxFrame = 500,
    loop = function () {

        var per = frame / maxFrame,
        bias = 1 - Math.abs(.5 - per) / .5,

        r = Math.PI * 2 * per,
        x = Math.cos(r) * 150,
        y = Math.sin(r) * 150,
        z = 300;

        requestAnimationFrame(loop);

        spotLight.position.set(x, z, y);
        spotLight.target.position.set(200 * bias, 0, 0);
        spotLightHelper.update();
        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();

}
    ());
