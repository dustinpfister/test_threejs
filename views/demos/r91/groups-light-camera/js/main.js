
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 50);
    camera.position.set(10, 10, 10);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0, 0, 0);

    // positioning a light above the camera
    var light = new THREE.PointLight();
    light.position.set(0, 5, 0);
    camera.add(light);

    // positioning a mesh in front of the camera
    var withCamera = new THREE.Mesh(

            new THREE.BoxGeometry(.1, .1, .1),
            new THREE.MeshStandardMaterial({

                color: 0xffffff

            }));
    withCamera.position.set( - .25, .2,  - .75);
    console.log();

    camera.add(withCamera);

    // adding the camera to the scene
    scene.add(camera);

    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),

            new THREE.MeshStandardMaterial({

                color: 0x00ff00

            })))

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var frame = 0,
    maxFrame = 1000;
    var loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    renderer.render(scene, camera);
    loop();

}
    ());
