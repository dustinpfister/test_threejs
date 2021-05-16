
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene();

    // so here I am setting the values of the perspective camera
    var fieldOfView = 40,
    width = 4 * 160,
    height = 3 * 160,
    aspectRatio = 4 / 3,
    near = 1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    // add a cube to the scene
    cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(cube);

    cube.position.set(0, 0, 0);
    camera.position.set(2, 2, 2);
    camera.lookAt(cube.position);

    renderer.render(scene, camera);

}
    ());
