
(function () {

    var genPanes = function (count) {

        var geometry = new THREE.Geometry(),

        offset,
        pane,
        x = 0,
        y = 0,
        z = 0;

        count = count || 6;

        pane = 0;
        while (pane < count) {

            var i = 0,
            len = 4;
            while (i < len) {

                x = Math.floor(i % 2);
                y = Math.floor(i / 2);
                z = pane;

                geometry.vertices.push(new THREE.Vector3(x, y, z));

                i += 1;
            }

            pane += 1;
        }


        pane = 0;
        while (pane < count) {

            offset = pane * 4;

            geometry.faces.push(
                new THREE.Face3(0 + offset, 1 + offset, 2 + offset),
                new THREE.Face3(3 + offset, 2 + offset, 1 + offset));
            pane += 1;
        }

        // compute Normals
        geometry.computeVertexNormals();
        // normalize the geometry
        geometry.normalize();

        return geometry;

    };

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);

    // MESH with Geometry, and Basic Material
    scene.add(new THREE.Mesh(

            genPanes(),

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
