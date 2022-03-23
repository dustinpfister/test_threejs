(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OBJECTS
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var cube2 = cube1.clone();
    scene.add(cube1);
    scene.add(cube2);
 
    // SETTING POSITION WITH Vector3.set and Vector3.multiplyScalar
    cube1.position.set(-1, 0, -1).multiplyScalar(4);
 
    // redner static scene
    renderer.render(scene, camera);
}
    ());