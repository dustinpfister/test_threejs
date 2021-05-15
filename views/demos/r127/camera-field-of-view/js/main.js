
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    // https://en.wikipedia.org/wiki/Viewing_frustum
    // THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far)
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 1000),

    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),

    // I will need a material for the cube
    material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

    // I need a mesh that will tie a geometry and material together
    mesh = new THREE.Mesh(geometry, material),

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('cube').appendChild(renderer.domElement);

    // initialize method
    var init = function () {

        scene.add(mesh);
        camera.position.z = 250;
        camera.position.x = 250;
        camera.lookAt(0, 0, 0);
        renderer.setSize(320, 240);

    },

    // update method
    i = 0,
    iMax = 100,
    lt = new Date(),
    fr = 100,
    update = function () {

        var per = i / iMax,
        now = new Date();
        var bias = 1 - Math.abs(.5 - per) / .5;
        var r = Math.PI * 2 * per;

        if (now - lt >= fr) {

            // changing field of view from 25 to 74 degrees
            camera.fov = Math.floor(25 + 50 * bias);
            camera.updateProjectionMatrix();

            i += 1;
            i = i % iMax;

            lt = now;

        }

    },

    // loop
    loop = function () {

        requestAnimationFrame(loop);

        update();
        renderer.render(scene, camera);

    };

    // call init, and start loop
    init();
    loop();

}
    ());
