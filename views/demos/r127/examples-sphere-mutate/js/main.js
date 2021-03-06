
(function () {

    // set location of a vert given an index value in geometry.index
    var setVert = function (geometry, vertIndex, pos) {
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex] : pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1] : pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2] : pos.z;
        position.needsUpdate = true;
    };

    // update top of sphere
    var updateSphereTopPoint = function (geometry, topPoint) {
        topPoint = topPoint === undefined ? 0.5 : topPoint;
        var position = geometry.getAttribute('position');
        var pos = {
            x: position.array[0],
            y: topPoint,
            z: position.array[2]
        };
        // getting width segments of sphere
        var ws = geometry.parameters.widthSegments;
        var i = 0;
        while (i < ws * 3) {
            setVert(geometry, i, pos);
            i += 1;
        }
    };

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY
    var geometry = new THREE.SphereGeometry(0.5, 30, 10);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
                color: 'red',
                side: THREE.DoubleSide
            }));
    scene.add(mesh);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(mesh.position);
    scene.add(camera);

    // LIGHT
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    camera.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);


    var per = 0,
    bias,
    lt = new Date(),
    maxFrames = 300,
    FPS = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / FPS) {
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;
            bias = 1 - Math.abs(per - 0.5) / 0.5;
            // calling update sphere helper
            updateSphereTopPoint(geometry, 0.75 - 0.75 * bias);

            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
