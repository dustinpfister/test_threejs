
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),

    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),

    // I will need a material for the cube
    material = new THREE.MeshNormalMaterial({
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

        // use scene.add to add a mesh to a scene
        scene.add(mesh);

		// light
		var light = new THREE.PointLight( 0xff0000, 1, 100 );
		light.position.set( 350, 350, 350 );
		
		light.lookAt(0,0,0)
        scene.add(light);

        // use scene.background to set the background color
        scene.background = new THREE.Color(0xafafaf);

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

            // move the position of the camera
            camera.position.x = Math.cos(r) * 300;
            camera.position.z = Math.sin(r) * 300;

            //scene.background = new THREE.Color(Math.random(), Math.random(), Math.random());

            // set the point that the camera is looking at
            camera.lookAt(0, -125 + 250 * bias, 0);

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
