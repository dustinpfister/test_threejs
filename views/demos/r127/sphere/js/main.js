
(function () {

    // creating a scene
    var scene = new THREE.Scene();

    var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040
            }));

    // add the box mesh to the scene
    scene.add(mesh);

    // camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.5, 0.75, 0.5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
