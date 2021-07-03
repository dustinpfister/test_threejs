(function () {
 
    // a scene is needed to place objects in
    var scene = new THREE.Scene(),
 
    // so here I am setting the values of the perspective camera
    fieldOfView = 45,
    aspectRatio = 4 / 3,
    near = 1,
    far = 1000,
    cam = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far),
 
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();
 
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // initialize method
    var init = function () {
 
        // add plane to the scene
        var plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(500, 500, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: 0x00afaf,
                    side: THREE.DoubleSide
                }));
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);
 
        // add a cube to the scene
        cube = new THREE.Mesh(
                new THREE.BoxGeometry(200, 200, 200),
                new THREE.MeshNormalMaterial({}));
        cube.position.set(0, 100, 0);
        scene.add(cube);
 
        // setting position of the camera
        // position is a property of Object3D
        // and the value is an instance of Vector3
        cam.position.set(400, 400, 400);
        cam.lookAt(0, 0, 0);
 
        // setting a background color
        scene.background = new THREE.Color(.7, .7, .7);
 
        // 16:9 aspect ratio canvas
        renderer.setSize(640, 480);
 
    },
 
    // update method
    i = 0,
    iMax = 100,
    lt = new Date(),
    fr = 100,
    update = function () {
 
        var per = i / iMax,
        now = new Date(),
        bias = 1 - Math.abs(.5 - per) / .5;
 
        if (now - lt >= fr) {
 
            // changing aspect, and field of view
            cam.aspect = .5 + 1.5 * bias;
            cam.fov = 50 + 25 * bias;
 
            // I must call this to get it to work
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