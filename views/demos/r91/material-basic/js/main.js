
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    var controls = new THREE.OrbitControls(camera);

    // When I Create a Mesh with a geometry
    // but give to material, it will default to
    // the basic material with a random color
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));

    console.log(scene.children[0].material.type); // MeshBasicMaterial

    // The color property will set a solid face color
    // for all faces.
    var redCube = new THREE.Mesh(

            new THREE.BoxGeometry(1, 1, 1),

            new THREE.MeshBasicMaterial({

                color: 0x00ff00

            }));
    redCube.position.set(-2, 0, 0);
    scene.add(redCube);

    var wireCube = new THREE.Mesh(

            new THREE.BoxGeometry(1, 1, 1),

            new THREE.MeshBasicMaterial({

                color: 0x0000ff,
                wireframe: true

            }));
    wireCube.position.set(-2, 0, -2);
    scene.add(wireCube);

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
