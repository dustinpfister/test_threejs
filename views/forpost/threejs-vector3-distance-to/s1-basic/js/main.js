
(function () {

    // simple create cube helper
    var createCube = function () {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        return cube;
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));

    // cubes
    var cube1 = createCube();
    scene.add(cube1);
    var cube2 = createCube();
    cube2.position.set(0, 0, 0);
    scene.add(cube2);

    // USING Vector3.distanceTo TO ADJUST THE POSITION OF CUBE2
    if (cube2.position.distanceTo(cube1.position) < 2) {
        cube2.position.set(2, 0, 0)
    }

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
