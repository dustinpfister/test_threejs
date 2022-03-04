(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // OBJECT3d position property
    // ---------- ----------
    // creating a plain base instance of object3d
    var obj = new THREE.Object3D();
    console.log(JSON.stringify(obj.position));
    // {"x":0,"y":0,"z":0}
    obj.position.set(1, 2, 3);
    console.log(JSON.stringify(obj.position));
    // {"x":1,"y":2,"z":3}
    // mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // a mesh is also based on object3D and as such also has a
    // position property the copy method can be used to copy the values
    // of one instance of vector 3 to another
    mesh.position.copy(obj.position);
    scene.add(mesh);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);

}
    ());