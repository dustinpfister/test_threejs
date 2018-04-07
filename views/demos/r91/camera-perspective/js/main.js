
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // for this demo I will have an array of cameras
    cam = new THREE.PerspectiveCamera(45, 16 / 9, 1, 1000),

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('cube').appendChild(renderer.domElement);

    // initialize method
    var init = function () {

        // add plane
        var plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(500, 500, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: 0x00afaf,
                    side: THREE.DoubleSide
                }));
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);

        // setting position of the camera
        // position is a property of Object3D
        // and the value is an instance of Vector3
        cam.position.set(350, 50, 350);

        // lookAt is also a method of Object3D
        cam.lookAt(0, 0, 0);

        scene.background = new THREE.Color(.7, .7, .7);

        // I need a mesh that will tie a geometry and material together
        cube = new THREE.Mesh(
                new THREE.BoxGeometry(200, 200, 200),
                new THREE.MeshNormalMaterial({}));

        cube.position.set(0, 100, 0);

        scene.add(cube);

        // 16:9 aspect ratio canvas
        renderer.setSize(320, 180);
        //renderer.gammaInput = true;
        //renderer.gammaOutput = true;

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
