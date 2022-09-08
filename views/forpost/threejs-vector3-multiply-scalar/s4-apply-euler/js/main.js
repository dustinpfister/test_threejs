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

    // CREATING ANSD POSITIONING MESH OBJECTS WITH Vector3 METHODS
    // including copy, add, normalize, and multiplyScalar
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());

    var radian = THREE.MathUtils.degToRad(90 + 25),
    radius = 4;
    var vec = new THREE.Vector3(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
    [[0,0,0,0], [-2,1,0,1.5], [-4,2,0,3], [-8,3,0,4.5]].forEach(function(data){
        var mesh = cube1.clone(),
        x = data[0], y = data[1], z = data[2], scalar = data[3];
        mesh.position.copy(vec).add(new THREE.Vector3(x, y, z) ).normalize().multiplyScalar(scalar);
        mesh.lookAt(cube1.position);
        scene.add(mesh);
    });
    scene.children[1].lookAt(scene.children[2].position)
 
    // render static scene
    renderer.render(scene, camera);
}
    ());