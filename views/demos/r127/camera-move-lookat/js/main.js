
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    // https://en.wikipedia.org/wiki/Viewing_frustum
    // THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far)
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),

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
    };

    // update method
    var update = function (per) {
        var now = new Date();
        var bias = 1 - Math.abs(.5 - per) / .5;
        var r = Math.PI * 2 * per;
        // move the position of the camera
        camera.position.x = Math.cos(r) * 300;
        camera.position.z = Math.sin(r) * 300;
        // set the point that the camera is looking at
        camera.lookAt(0, -125 + 250 * bias, 0);

    };

    // loop
    var frame = 0,
    frameMax = 30 * 5,
    fps = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(frame / frameMax);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= frameMax;
            lt = now;
        }
    };

    // call init, and start loop
    init();
    loop();

}
    ());
