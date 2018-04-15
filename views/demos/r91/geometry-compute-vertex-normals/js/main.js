
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(1.5, 1.5, 2);
    camera.lookAt(0, 0, 0);
    var controls = new THREE.OrbitControls(camera);

    // creating a custom geometry of incomplete cube
    var geometry = new THREE.Geometry();
    geometry.vertices.push(

        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(0, 5, 0),

        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(5, 0, 5),
        new THREE.Vector3(5, 5, 5),
        new THREE.Vector3(0, 5, 5));
    geometry.faces.push(

        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 0, 2),

        new THREE.Face3(0, 4, 1),
        new THREE.Face3(5, 1, 4),

        new THREE.Face3(3, 7, 2),
        new THREE.Face3(6, 2, 7),

        new THREE.Face3(1, 2, 6),
        new THREE.Face3(5, 1, 6)
    );

    // normalize
    geometry.normalize();
    geometry.computeVertexNormals();

    // geometry is now centered to the origin
    // and is inside the range of one
    //console.log(geometry.vertices[0].x); // -0.707...
    //console.log(geometry.vertices[1].x); // 0.707...

    // MESH with Geometry, and Basic Material
    scene.add(new THREE.Mesh(

            geometry,

            // Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            })));

    // show vert helper script
    geometry.vertices.forEach(function (v, i) {

        console.log(i, v.x, v.y, v.z);

        var show = [1, 2, 6],
        si = 0,
        len = show.length;
        while (si < len) {

            if (i === show[si]) {

                var mesh = new THREE.Mesh(

                        new THREE.BoxGeometry(.1, .1, .1),

                        // Material
                        new THREE.MeshNormalMaterial({
                            side: THREE.DoubleSide
                        }));

                mesh.position.set(v.x, v.y, v.z);

                scene.add(mesh);

                break;

            }

            si += 1;

        }

    });

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        controls.update();

        renderer.render(scene, camera);

    };

    loop();
}
    ());
