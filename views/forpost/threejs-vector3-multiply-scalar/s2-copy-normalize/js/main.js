(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OBJECTS
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var cube2 = cube1.clone();
    var cube3 = cube1.clone();
    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
 

    // SETTING POSITION WITH Vector3.copy, normalize, and Vector3.multiplyScalar
    var radian = THREE.MathUtils.degToRad(90 + 45), //Math.PI / 180 * 90,
    radius = 4;
    var vec = new THREE.Vector3(
        Math.cos(radian) * radius,
        0,
        Math.sin(radian) * radius
    );
    cube1.position.copy(vec);
    var scalar = 1 + Math.round(2 * Math.random())
    cube2.position.copy(vec).normalize().multiplyScalar(scalar);
    // adjust rotation of cubes
    cube1.lookAt(0, 0, 0);
    cube2.lookAt(0, 0, 0);
    cube3.lookAt(cube1.position);

    // redner static scene
    renderer.render(scene, camera);
}
    ());