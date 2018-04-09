
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 5000);

    var lambert = new THREE.MeshLambertMaterial({
            color: 0xff0000
        });

    // I need a mesh that will tie a geometry and material together
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            lambert);
    cube.position.set(0, 150, 0);
    cube.castShadow = true;
    scene.add(cube);

    // set up a render
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    // background
    scene.background = new THREE.Color(0x0f0f0f);

    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff);

    // add a cube that will serve at showing me where
    // the spotlight is

    /*
    spotLight.add(new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
    color: 0xff0000
    })));

     */

    spotLight.castShadow = true;
    //spotLight.shadow.mapSize.width = 1024;
    //spotLight.shadow.mapSize.height = 1024;
    //spotLight.shadow.camera.near = .5;
    //spotLight.shadow.camera.far = 500;
    //spotLight.shadow.camera.fov = 30;
    spotLight.position.set(-250, 350, 250);

    spotLight.intensity = 2;
    spotLight.penumbra = 1;
    spotLight.angle = Math.PI / 3;
    spotLight.distance = 800;

    //spotLight.add(new THREE.SpotLightHelper(spotLight));

    //spotLight.target = cube;
    //spotLight.lookAt(cube.position.x, cube.position.y, cube.position.z);
    scene.add(spotLight);

    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(3000, 3000, 8, 8),
            new THREE.MeshStandardMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // set the position of the camera away from the cube, and
    // look at the cube.
    camera.position.set(500, 500, 500);
    camera.lookAt(cube.position);
    renderer.setSize(320, 240);

    // render what we have
    //renderer.render(scene, camera);

    var frame = 0,
    maxFrame = 500,
    loop = function () {

        var per = frame / maxFrame,
        bias = 1 - Math.abs(.5 - per) / .5,

        r = Math.PI * 2 * per,
        x = Math.cos(r) * 300,
        y = Math.sin(r) * 300,
        z = 350;

        requestAnimationFrame(loop);

        spotLight.position.set(x, z, y);
        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();

}
    ());
