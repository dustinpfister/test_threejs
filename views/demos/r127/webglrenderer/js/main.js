

(function () {

    // CREATING A WEBL RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    // add something to the scene
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            })));

    // RENDERING
    renderer.render(scene, camera);

}
    ());
