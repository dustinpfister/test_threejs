
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);

    // I need a mesh that will tie a geometry and material together
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 100, 0);
    scene.add(cube);

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

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
    scene.add(spotLight);

    // light box for the spot light
    // so I know where it is
    var lightBox = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }));
    scene.add(lightBox);

    // set the position of the camera away from the cube, and
    // look at the origin.
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    renderer.setSize(320, 240);

    var frame = 0,
    maxFrame = 100;
    loop = function () {

        var per = frame / maxFrame,
        bias = 1 - Math.abs(.5 - per) / .5,

        r = Math.PI * 2 * per,
        x = Math.cos(r) * 300,
        y = Math.sin(r) * 300,
        z = 100 + 300 * bias;

        requestAnimationFrame(loop);

        lightBox.position.set(x, z, y);
        spotLight.position.set(x, z, y);
        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();

}
    ());
