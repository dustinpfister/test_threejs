
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 50);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // CREATING A GROUP
    var group = new THREE.Group();
    var i = 0,
    count = 5;
    while (i < count) {
        var bx = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    wireframe: true
                })),
        r = Math.PI * 2 / count * i;
        bx.position.set(
            Math.cos(r) * 4,
            0,
            Math.sin(r) * 4);
        bx.lookAt(0, 0, 0);
        group.add(bx);
        i += 1;
    }
    scene.add(group);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
