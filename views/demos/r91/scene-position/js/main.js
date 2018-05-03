

(function () {

    // create a Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);

    // just adding a 1x1x1 cube with the default
    // MeshBasicMaterial and random color for faces
    // when added to the scene like this
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));

    // adding another 1x1x1 cube but this time I am giving
    // and instance of MeshBasicMaterial in which I am setting
    // the face color of the faces to red
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),

            new THREE.MeshBasicMaterial({

                color: 0x00ff00

            }));
    cube2.position.set(-2, 0, 0);
    scene.add(cube2);

    // a sphere using the lamber material in wire frame mode
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),

            new THREE.MeshLambertMaterial({

                emissive: 0x00004a

            }));
    sphere.position.set(0, 0, -2);
    scene.add(sphere);

    // add a CAMERA to it so we can see something
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);

    // position The camera away from the origin
    // and have it look at the origin
    // by default that is where something goes.
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);

    // we need a RENDERER to render the scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var frame = 0,
    maxFrame = 50,
    loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);

        // using Object3D scene position, and rotation
        // properties
        scene.position.set(0, 1 * bias, 0);
        scene.rotation.set(Math.PI * 2 * per, 0, 0);
        renderer.render(scene, camera);

        frame += 1;
        frame %= maxFrame;

    };

    loop();

}
    ());
