(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 1, 0.75);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.set(1, 1, 0);
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // THE SPHERE
    // ---------- ----------
    var materials = [
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x202020
        }),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x202020
        }),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x202020
        }),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x202020
        })
    ];

    var geometry = new THREE.SphereGeometry(0.5, 21, 22);
    var position = geometry.attributes.position,
    len = position.array.length,
    mi = 0,
    i = 0;
    while (i < len) {
        //mi = i / 3 % 2 === 0 ? 0 : 1;
        mi = i / 3 % 4;
        geometry.addGroup(i, 3, mi);
        i += 3;

        //i += 6;
        //mi = (i - 6) / 3 % 2 === 0 ? 0 : 1;
        //geometry.addGroup((i - 6), 3, mi);
        //geometry.addGroup((i - 3), 3, 1);

    }
    var mesh = new THREE.Mesh(
            geometry, // USING A SPHERE GEOMETRY
            materials // PASSING AN ARRAY OF MATERIALS
    );
    scene.add(mesh);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());