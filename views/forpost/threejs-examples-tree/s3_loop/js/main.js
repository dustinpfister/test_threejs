
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(15, 15));

    // BASIC TREE
    var tree = new Tree({
            sections: 8,
            conesPerSection: 16,
            coneMaterial: new THREE.MeshStandardMaterial({
                color: 0x00af00
            })
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

    // LOOP
    var frame = 0,
    maxFrame = 300;
    var loop = function () {
        requestAnimationFrame(loop);

tree.group.children.forEach(function(coneGroup, i){
    coneGroup.rotation.y = Math.PI / 180 * 180 * (frame / maxFrame) * (i + 1);
});

        camera.lookAt(0, 2, 0);
        renderer.render(scene, camera);

frame += 1;
frame %= maxFrame;

    };
    loop();
}
    ());
