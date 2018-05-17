
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
            .01,
            100);

    // set to same position, and look at the origin
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    // set zoom
    camera.zoom = .75;
    camera.updateProjectionMatrix();

    // point light above the camera
    var light = new THREE.PointLight();
    light.position.set(0, 2, 0);
    camera.add(light);

    new THREE.OrbitControls(camera);

    // make the camera part of the scene
    scene.add(camera);

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
    plane.position.set(0,  - .5, 0);
    plane.rotation.set(Math.PI / 2, 0, 0);
    plane.geometry.faces.forEach(function (face, i) {
        face.materialIndex = i % 2;
    });
    scene.add(plane);

    // place some boxes on the plane
    var boxCount = 30,
    box,
    x,
    y,
    z,
    boxArray = [],
    boxIndex = 0;
    while (boxIndex < boxCount) {

        box = new THREE.Mesh(

                new THREE.BoxGeometry(1, 1, 1),

                new THREE.MeshStandardMaterial({

                    color: 0x00ffff,
                    emissive: 0x0a0a0a

                }));

        x = Math.floor(5 * Math.random());
        y = 0;
        z = Math.floor(5 * Math.random());

        if (boxArray[z] === undefined) {

            boxArray[z] = [];

        }

        if (boxArray[z][x] === undefined) {

            boxArray[z][x] = [];

        }

        boxArray[z][x].push(box);
        y = boxArray[z][x].length - 1;

        box.position.set(

            -2 + x,
            y,
            -2 + z);
        scene.add(box);

        boxIndex += 1;
    }

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
