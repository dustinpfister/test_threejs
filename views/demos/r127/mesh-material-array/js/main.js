
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // a box geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1),

    // the materials array
    materials = [
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

    // for all faces
    geometry.faces.forEach(function (face,i) {

        // use each of the three materials 2 times
        face.materialIndex = Math.floor(i/2) % 3

    });

    // add to scene with the Mesh
    scene.add(new THREE.Mesh(

            geometry,
            materials));


    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var loop = function () {

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

    };

    loop();

}
    ());
