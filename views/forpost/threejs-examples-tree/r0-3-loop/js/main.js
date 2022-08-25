
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
    camera.lookAt(0, 2, 0);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    camera.lookAt(0, 2, 0);

    // LOOP
    var fps = 30,
    lt = new Date(),
    frame = 0,
    maxFrame = 300;
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            tree.group.children.forEach(function(coneGroup, i){
                coneGroup.rotation.y = Math.PI / 180 * 90 * per * (i + 1);
            });
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
