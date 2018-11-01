
(function () {

    // export video
    var exportVid = function (blob) {
        const vid = document.createElement('video');
        vid.src = URL.createObjectURL(blob);
        vid.loop = true;
        vid.controls = true;
        document.body.appendChild(vid);
    };

    // SCENE
    var scene = new THREE.Scene();

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),

    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),

    // I will need a material for the cube
    material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

    // I need a mesh that will tie a geometry and material together
    mesh = new THREE.Mesh(geometry, material),

    // set up renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    scene.add(mesh);

    // set the position of the camera away from the cube, and
    // look at the origin.
    //camera.position.set(250, 200, 250);
    //camera.lookAt(0, 0, 0);


    // create encoder
    var seconds = 20,
    fps = 12,
    encoder = new Whammy.Video(12);

    var i = 0,
    maxI = 240;

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

    animate();

}
    ());
