
(function () {

    var material = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0x404040,
            side: THREE.DoubleSide
        });

    // create a Dome at helper
    var createDomeAt = function (x, z, rPer, r, cap) {
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY
                new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
                // standard material
                material);
        if (cap) {
            var circle = new THREE.Mesh(
                    // USING A CIRCLE GEOMETRY
                    new THREE.CircleGeometry(r, 30),
                    // standard material
                    material);
            circle.geometry.rotateX(Math.PI * 0.5);
            mesh.add(circle);
        }
        mesh.position.set(x, 0.5, z);
        mesh.geometry.rotateX(Math.PI * 2 * rPer);
        return mesh;
    };

    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));

    scene.add(createDomeAt(0, 0, 0.0));
    scene.add(createDomeAt(0, 1.5, 0.5, 0.75));
    scene.add(createDomeAt(1.5, 0, 0.5, 0.75, true));

    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 4;
    light.position.y = -0.5;
    camera.add(light);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    //var controls = new THREE.OrbitControls(camera, renderer.domElement);

    //var loop = function () {
    //    requestAnimationFrame(loop);


    //};
    //loop();

}
    ());
