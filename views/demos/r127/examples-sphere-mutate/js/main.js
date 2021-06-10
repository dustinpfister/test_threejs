
(function () {

    var getNormalPos = function (geometry, normalIndex) {
        var normal = geometry.getAttribute('normal');
        var position = geometry.getAttribute('position');
        return normal.array.slice(normalIndex * 3, normalIndex * 3 + 3);
    };

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

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY
    var geometry = new THREE.SphereGeometry(0.5, 8, 8);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
                //wireframe: true,
                color: 'red',
                side: THREE.DoubleSide
            }));
    scene.add(mesh);

    var position = geometry.getAttribute('position');

    var updateSphereTopPoint = function (geometry, topPoint) {
        topPoint = topPoint === undefined ? 0.5 : topPoint;
        var pos = {
            x: position.array[0],
            y: position.array[1] + 0.5,
            z: position.array[2]
        };
        var i = 0;
        while (i < 8 * 8) {
            setVert(geometry, i, pos);
            i += 1;
        }
    }

    updateSphereTopPoint(geometry);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    camera.add(light);
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var per = 0,
    lt = new Date(),
    maxFrames = 300,
    FPS = 5;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / FPS) {
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;

            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
