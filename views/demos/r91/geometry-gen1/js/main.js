
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);

    var geometry = new THREE.Geometry();

    var count = 6,
    x = 0,
    y = 0,
    z = 0;
    while (z < count) {

        y = 0;
        while (y < 2) {

            x = 0;
            while (x < 2) {

                geometry.vertices.push(new THREE.Vector3(x, y, z));

                x += 1;

            }

            y += 1;

        }

        z += 1;

    }

    var i = 0,
    offset = 0;
    while (i < count) {

        offset = i * 4;

        geometry.faces.push(
            new THREE.Face3(0 + offset, 1 + offset, 2 + offset),
            new THREE.Face3(3 + offset, 2 + offset, 1 + offset));
        i += 1;
    }

    // compute Normals
    geometry.computeVertexNormals();
    // normalize the geometry
    geometry.normalize();

    // MESH with Geometry, and Basic Material
    scene.add(new THREE.Mesh(

            geometry,

            // Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            })));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
