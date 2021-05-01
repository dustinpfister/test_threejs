
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // the materials array
    var materials = [
        // material 0 (red basic)
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        // material 1 (green basic)
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        }),

        // material 2 (blue basic)
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide
        })
    ];

    // a box geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // for all faces
    geometry.groups.forEach(function (face, i) {
        face.materialIndex = i % materials.length;
    });

    // add to scene with the Mesh
    scene.add(new THREE.Mesh(
            geometry,
            materials));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
