(function () {
    //******** **********
    // CAMERA
    //******** **********
    var fieldOfView = 40,
    width = 4 * 160,
    height = 3 * 160,
    aspectRatio = 4 / 3,
    near = 1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    //******** **********
    // SCENE, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // MESH
    //******** **********
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(cube);
    cube.position.set(0, 0, 0);
    //******** **********
    // RENDER SCENE WITH CAMERA
    //******** **********
    renderer.render(scene, camera);
}
    ());