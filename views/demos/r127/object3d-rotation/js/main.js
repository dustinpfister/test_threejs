
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // creating an instance of Object3D
    var obj = new THREE.Object3D();
    obj.rotation.set(0, 0, Math.PI * 1.75);

    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh.rotation.copy(obj.rotation);
    scene.add(mesh);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
