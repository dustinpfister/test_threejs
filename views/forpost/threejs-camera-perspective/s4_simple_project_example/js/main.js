(function () {
 
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // so here I am setting the values of the perspective camera
    var fieldOfView = 45,
    aspectRatio = 4 / 3,
    near = 1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // initialize method
    var init = function () {
        // add plane to the scene
        var plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(5, 5, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: 0x00afaf,
                    side: THREE.DoubleSide
                }));
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);
        // add a cube to the scene
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshNormalMaterial({}));
        cube.position.set(0, 1, 0);
        scene.add(cube);
        // setting position of the camera
        // position is a property of Object3D
        // and the value is an instance of Vector3
        camera.position.set(4, 4, 4);
        camera.lookAt(0, 0, 0);
    };
 
    // update method
    var update = function (per, bias, secs) {
        camera.aspect = .5 + 1.5 * bias;
        camera.fov = 50 + 25 * bias;
        camera.updateProjectionMatrix();
    };
 
    // loop
    var per = 0,
    bias = 0,
    now = new Date(),
    secs = 0,
    lt = now,
    frame = 0,
    frameMax = 300,
    fps = 30;
    var loop = function () {
        now = new Date();
        secs = (now - lt) / 1000;
        per = frame / frameMax;
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            update(per, bias, secs);
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