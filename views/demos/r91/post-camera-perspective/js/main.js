
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // for this demo I will have an array of cameras
    cam = new THREE.PerspectiveCamera(45, 16 / 9, 1, 1000),

    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),

    // I will need a material for the cube
    material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: false
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

        // setting position of the camera
        // position is a property of Object3D
        // and the value is an instance of Vector3
        cam.position.set(350, 350, 350);

        // lookAt is also a method of Object3D
        cam.lookAt(0, 0, 0);

        scene.add(mesh);

        // 16:9 aspect ratio canvas
        renderer.setSize(320, 180);

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
            cam.aspect = 16 / 9;
            cam.updateProjectionMatrix();

            i += 1;
            i = i % iMax;

            lt = now;

        }

    },

    // loop
    loop = function () {

        requestAnimationFrame(loop);

        update();
        renderer.render(scene, cam);

    };

    // call init, and start loop
    init();
    loop();

}
    ());
