(function () {
    // a scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.7, 0.7, 0.7);
 
    // setting the values of the perspective camera
    var fieldOfView = 45,
    aspectRatio = 4 / 3,
    near = 0.1,
    far = 100,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    // initialize method
    var init = function () {
        // add plane to the scene
        var plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(4, 4),
                new THREE.MeshDepthMaterial({
                    side: THREE.DoubleSide
                }));
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);
        // add a cube to the scene
        cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshDepthMaterial({}));
        cube.position.set(0, 0.5, 0);
        scene.add(cube);
        camera.position.set(3.5, 4.5, 3.5);
        camera.lookAt(0, 0, 0);
        renderer.setSize(640, 480);
    };
    // update method
    var update = function (per) {
        var bias = 1 - Math.abs(.5 - per) / 0.5;
        camera.far = 4.5 + 8.5 * bias;
        camera.near = 0.1 + 8.9 * bias;
        camera.updateProjectionMatrix();
    };
    // loop
    var frame = 0,
    frameMax = 30 * 10,
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