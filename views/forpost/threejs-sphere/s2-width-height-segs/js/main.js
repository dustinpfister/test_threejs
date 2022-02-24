(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var createSphereAt = function (x, z, w, h, r) {
        w = w === undefined ? 30 : w;
        h = h === undefined ? 15 : h;
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
                new THREE.SphereGeometry(r, w, h),
                // standard material
                new THREE.MeshStandardMaterial({
                    color: 0xff0000,
                    emissive: 0x404040
                }));
        mesh.position.set(x, 0, z);
        return mesh;
    };
    scene.add(createSphereAt(-1.25, 0, 20, 20));
    scene.add(createSphereAt(0, 0, 10, 10));
    scene.add(createSphereAt(1.25, 0, 5, 5));

    renderer.render(scene, camera);
 
}
    ());