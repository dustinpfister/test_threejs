
(function () {

    var scene = new THREE.Scene();

    var nested = NestedGroupsMod.create();
    scene.add(nested);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            NestedGroupsMod.update(nested, secs);
            renderer.render(scene, nested.userData.camera);
            lt = now;
        }
    };

    loop();

}
    ());
