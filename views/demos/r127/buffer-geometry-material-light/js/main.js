
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 4);

    var materials = [
        new THREE.MeshStandardMaterial({
            color: 'red',
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 'lime',
            side: THREE.DoubleSide
        })
    ];

    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0, // triangle 1
                1, 0, 0,
                1, 1, 0,

                0, 0, 0, // triangle 2
                0, 1, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // compute vertex normals
    geometry.computeVertexNormals();

    // add groups, and set material index values
    geometry.addGroup(0, 3, 0);
    geometry.addGroup(3, 3, 1);

    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
            geometry,
            materials));

    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            materials);

   box.position.set(-1, 0, 0);

    scene.add(box);

    // ADD A POINT LIGHT
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

    // add AmbientLight
    //var light = new THREE.AmbientLight(0xffffff);
    //light.intensity = 0.1;
    //scene.add(light);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
