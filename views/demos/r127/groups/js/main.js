
(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));

    // CREATING A GROUP
    var group = new THREE.Group();
    var i = 0,
    radius = 2,
    count = 8;
    while (i < count) {
        // creating a mesh
        var bx = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial()),
        r = Math.PI * 2 / count * i;
        // set position of mesh
        bx.position.set(
            Math.cos(r) * radius,
            0,
            Math.sin(r) * radius);
        // add mesh to the group
        group.add(bx);
        i += 1;
    }
    scene.add(group);

    // changing position and rotation of the group
    group.position.set(-4, 0, -4);
    group.rotation.z = Math.PI / 180 * 90;

    // Camera and Render
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 50);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
