
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // GEOMETRY
    var geometry = new THREE.Geometry();

    var i = 0,
    iMax = 50,
    rotationCount = 4,
    vert,
    per,
    r;
    while (i < iMax) {

        // percent
        per = i / iMax;

        // radian
        r = Math.PI * 2 * rotationCount * per;
        r %= Math.PI * 2;

        // current vertex
        vert = new THREE.Vector3();
        vert.x = Math.cos(r) * (1 + 15 * per);
        vert.y = 100 * per;
        vert.z = Math.sin(r) * (1 + 15 * per);

        geometry.vertices.push(vert);

        i += 1;

    }

    // normalize the geometry
    geometry.normalize();

    // MESH with GEOMETRY, and Normal MATERIAL

    var points = new THREE.Points(

            // geometry as first argument
            geometry,

            // then Material
            new THREE.PointsMaterial({

                size: .05

            }));

    scene.add(points);

    //scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    //scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
