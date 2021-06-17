
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(5, 5));

    // creating a mesh
    var mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 30, 30),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.lookAt(0, 1, 0);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
