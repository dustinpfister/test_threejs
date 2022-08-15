(function () {
    // CAMERA
    var left = -3.2,
    right = 3.2,
    top = 2.4,
    bottom = -2.4,
    near = 0.01,
    far = 100,
    camera = new THREE.OrthographicCamera(
            left,
            right,
            top,
            bottom,
            near,
            far);
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
    renderer.render(scene, camera);
}
    ());