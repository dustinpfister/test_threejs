
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // a mesh using the BASIC MATERIAL
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            // the color property will apply to all faces
            // for this mesh
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            }));
    scene.add(box);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
