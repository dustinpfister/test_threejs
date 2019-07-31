

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 10);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);

    // TREE
    var tree = new Tree({
            coneMaterial: new THREE.MeshStandardMaterial({
                color: 0x00af00
            }),
            forConeValues: function (cone, section) {

                cone.material = new THREE.MeshBasicMaterial({
                        color: new THREE.Color( Math.random(), Math.random(), 0 ) //0xff0000
                    })

            }
        });

    scene.add(tree.group);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}
    ());
