
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

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

    var len = materials.length;
    geometry.faces.forEach(function (face3, i) {
        face3.materialIndex = Math.floor(i % (len * 2) / 2);
    });

    var mesh = new THREE.Mesh(

            // geometry as first argument
            geometry,
            materials);

    scene.add(mesh);

    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };

    loop();

}
    ());
