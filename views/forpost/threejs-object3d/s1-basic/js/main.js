(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Object 3d position
    var obj3d = new THREE.Object3D();
 
    // {"x":0,"y":0,"z":0}
    console.log(JSON.stringify(obj3d.position));
 
    obj3d.position.set(-3, 4, 4);
 
    // {"x":3,"y":4,"z":5}
    console.log(JSON.stringify(obj3d.position));

    // A mesh object is bassed off of Object3d
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, obj3d.position.y * 2, 1), new THREE.MeshNormalMaterial() );
    scene.add(mesh);
    mesh.position.copy(obj3d.position);

    // A Camera is also based on object3d
    camera.position.set(15, 15, -15);
    camera.lookAt(mesh.position);

    // render static scene
    renderer.render(scene, camera);
}
    ());