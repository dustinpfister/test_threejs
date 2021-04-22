
(function () {

    // REVISION 127 was used for this example
    console.log(THREE.REVISION);

    // ARRAY OF MATERIALS
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

    // geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // SET THE INDEX VALUES FOR EACH FACE
    geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % materials.length);
    });

    // mesh
    var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // array of materials as the second argument
            materials);
    // scene, add mesh
    var scene = new THREE.Scene();
    scene.add(mesh);
    // camera, renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
