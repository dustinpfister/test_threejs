
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    // length
    var r = Math.PI / 180 * 90,
    x = Math.cos(r) * 2,
    z = Math.sin(r) * 2,

    vec = new THREE.Vector3(x, 0, z);

    console.log(vec.isVector3); // true
    console.log(vec.x, vec.y, vec.z); // 0.70... 0.70... 0
    console.log(vec.length()); // 1

    // just creating and adding a cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube.position.copy(vec);
    scene.add(cube);


    // just creating and adding a cube
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(cube2);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
