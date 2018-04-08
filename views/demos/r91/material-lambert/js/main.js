
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000),

    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),

    // I will need a material for the cube
    lambert = new THREE.MeshLambertMaterial({
            color: 0xff0000
        });

    // I need a mesh that will tie a geometry and material together
    cube = new THREE.Mesh(geometry, lambert),
    target = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })),

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    cube.position.set(0, 100, 0);
    scene.add(cube);
    scene.add(target);

    // background
    scene.background = new THREE.Color(0x000000);

    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1500, 1500, 8, 8),
            new THREE.MeshBasicMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 350, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // set the position of the camera away from the cube, and
    // look at the origin.
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    renderer.setSize(320, 240);
    //renderer.physicallyCorrectLights = true;

    //renderer.render(scene, camera);


    var frame = 0,
    maxFrame = 100;

    var loop = function () {

        var per = frame / maxFrame,
        bias = 1- Math.abs(.5 - per) / .5,

        r = Math.PI * 2 * per,
        x = Math.cos(r) * 300,
        y = Math.sin(r) * 300,
        z = 100 + 300 * bias;

        requestAnimationFrame(loop);

        target.position.set(x, z, y);
        spotLight.position.set(x, z, y);
        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();

}
    ());
