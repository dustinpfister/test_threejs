
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);

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

    // add groups, and set material index values
    geometry.addGroup(0, 3, 1);
    geometry.addGroup(3, 3, 0);

    console.log(geometry.groups);
    console.log(new THREE.BoxGeometry(1, 1, 1));

    // compute vertex normals
    //geometry.computeTangents();

    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
            geometry,

            [
                new THREE.MeshBasicMaterial({
                    color: 'red',
                    side: THREE.DoubleSide
                }),
                new THREE.MeshBasicMaterial({
                    color: 'lime',
                    side: THREE.DoubleSide
                })
            ]));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
