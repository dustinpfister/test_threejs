
(function () {

    // SCENE
    var scene = new THREE.Scene();

    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        })
    ];

    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    geometry.groups.forEach(function (face3, i) {
        face3.materialIndex = Math.floor(i % materials.length);
    });
    // MESH
    var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // array of materials as the second argument
            materials);
    scene.add(mesh);

    // CAMERA, RENDER
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
