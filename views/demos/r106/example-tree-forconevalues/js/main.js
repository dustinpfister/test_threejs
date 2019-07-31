

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, 15);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);

    // TREE with custom forConeValues method
    var tree = new Tree({
            coneMaterial: new THREE.MeshStandardMaterial({
                color: 0x00af00
            }),
            sections: 10,
            forConeValues: function (cone, section) {
                cone.length = 4;
                cone.radius = 1.1 - 0.4 * (section.i / this.sections);
                var radius = cone.length - cone.length * 0.80 * (section.i / this.sections);
                cone.x = Math.cos(cone.radian) * radius;
                cone.z = Math.sin(cone.radian) * radius;
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
