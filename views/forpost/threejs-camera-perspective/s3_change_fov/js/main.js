(function () {
    // CAMERA
    var fieldOfView = 40,
    aspectRatio = 4 / 3,
    near = 0.1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.position.set(2, 2, 2); // position camera
    camera.lookAt(0, 0, 0);       // have camera look at 0,0,0
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    // mesh
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
    // renderer
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);

    // loop
    var state = {
        per: 0
    };
    var loop = function(){
        var bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        requestAnimationFrame(loop);
        camera.fov = Math.floor(25 + 75 * bias);
        camera.updateProjectionMatrix();
        state.per += 0.0125;
        state.per %= 1;
        renderer.render(scene, camera);
    };
    loop();

}
    ());