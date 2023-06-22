(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(1.2, 0.8, 0);
    camera.lookAt(0, 0, 0.4);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.set(1, 1, 0);
    camera.add(light);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING A MESH OBJECTS TO SCENE
    // ---------- ----------
    var createDomeAt = function (x, z, rPer, r) {
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
                new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
                // standard material
                new THREE.MeshStandardMaterial({
                    color: 0xff0000,
                    emissive: 0x404040,
                    side: THREE.DoubleSide
                }));
        mesh.position.set(x, 0, z);
        mesh.geometry.rotateX(Math.PI * 2 * rPer);
        return mesh;
    };
    scene.add(createDomeAt(0, 0, 0.0));
    scene.add(createDomeAt(0, 1, 0.5));
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());
