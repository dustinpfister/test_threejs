
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(15, 15));
    // USING FOR CONE
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
    // render, camera, light
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(10, 10, 10);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    camera.lookAt(0, 2, 0);
    renderer.render(scene, camera);
}
    ());