
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var width = 3.2,
    height = 2.4,
    camera = new THREE.OrthographicCamera(
            width * -1,
            width,
            height,
            height * -1,
            .1,
            100);

    // set to same position, and look at the origin
    camera.position.set(1, 2, 2);
    camera.zoom = .75;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);

    scene.add(camera);

    // point light above the camera
    var light = new THREE.PointLight();
    light.position.set(0, 2, 0);
    camera.add(light);

    // Plane
    var plane = new THREE.Mesh(
            // plane geometry
            new THREE.PlaneGeometry(5, 5, 5, 5),
            // materials
            [
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }),
                new THREE.MeshStandardMaterial({
                    color: 0x0000ff,
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                })
            ]);

    var boxCount = 3,
    box
    boxIndex = 0;
    while (boxIndex < boxCount) {

        box = new THREE.Mesh(

                new THREE.BoxGeometry(1, 1, 1),

                new THREE.MeshStandardMaterial({

                    color: 0x00ffff,
                    emissive: 0x0a0a0a

                }));

        box.position.set(

            2 - .5,
            0,
             - .5);
        scene.add(box);

        boxIndex += 1;
    }

    plane.position.set(0,  - .5, 0);
    plane.rotation.set(Math.PI / 2, 0, 0);
    plane.geometry.faces.forEach(function (face, i) {
        face.materialIndex = i % 2;
    });
    scene.add(plane);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
