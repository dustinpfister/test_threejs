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

    var radian = THREE.MathUtils.degToRad(90 + 25),
    radius = 4;
    var vec = new THREE.Vector3(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
    [[0,0,0,0], [0,0,0,1], [0,0,0,3], [0,0,0,4]].forEach(function(data){
        var mesh = cube1.clone();
        mesh.position.copy(vec).normalize().multiplyScalar(data[3]);
        mesh.lookAt(cube1.position);
        scene.add(mesh);
    });
    scene.children[1].lookAt(scene.children[2].position)
 
    // redner static scene
    renderer.render(scene, camera);
}
    ());