
(function () {

    // create encoder
    var seconds = 20,
    fps = 12,
    i = 0,
    maxI = 240,
    encoder = new Whammy.Video(12);

    // loop
    var animate = function () {

        // find current percent
        // and set values based on that
        var per = i / maxI,
        r = Math.PI * 2 * per;

        // make changes to for new frame
        camera.position.set(Math.cos(r) * 200, Math.sin(r) * 200, 250);
        camera.lookAt(0, 0, 0);

        // render frame
        renderer.render(scene, camera);

        // add frame to encoder
        encoder.add(renderer.domElement.toDataURL('image/webp'));

        // if the animation is not over
        if (i < maxI) {

            // request the next frame
            requestAnimationFrame(animate);
        } else {

            // else comple, and export
            encoder.compile(false, function (output) {
                exportVid(output);
            });

        }

        i += 1;

    };

    // export video helper
    var exportVid = function (blob) {
        const vid = document.createElement('video');
        vid.src = URL.createObjectURL(blob);
        vid.loop = true;
        vid.controls = true;
        document.body.appendChild(vid);
    };

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);

    // MESH
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }));
    scene.add(mesh);

    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    animate();

}
    ());
