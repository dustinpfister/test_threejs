
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    //var controls = new THREE.OrbitControls(camera);

    var i = 0,
    iMax = 50,
    rotationCount = 4,
    vert,
    vertices = [],
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
        vert.x = Math.cos(r) * (1 + 5 * per);
        vert.y = -10 + 15 * per;
        vert.z = Math.sin(r) * (1 + 5 * per);

        vertices.push(vert.x, vert.y, vert.z);

        i += 1;

    }

    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));


    // MESH with GEOMETRY, and Normal MATERIAL
    var points = new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .05
            }));
    scene.add(points);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };

    loop();

}
    ());
