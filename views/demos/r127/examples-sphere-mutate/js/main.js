
(function () {

    var getNormalPos = function (geometry, normalIndex) {
        var normal = geometry.getAttribute('normal');
        var position = geometry.getAttribute('position');
        return normal.array.slice(normalIndex * 3, normalIndex * 3 + 3);
    };

    // set a given arrow helper to the given normal index
    var setArrowHelperToNormal = function (geometry, arrowHelper, normalIndex) {
        // check out the normal attribute of a cube
        var normal = geometry.getAttribute('normal');
        var position = geometry.getAttribute('position');
        var values = normal.array.slice(normalIndex * 3, normalIndex * 3 + 3);
        var dir = new THREE.Vector3(values[0], values[1], values[2]);
        var values = position.array.slice(normalIndex * 3, normalIndex * 3 + 3);
        var origin = new THREE.Vector3(values[0], values[1], values[2]);
        arrowHelper.setDirection(dir);
        arrowHelper.setLength(0.25);
        arrowHelper.position.copy(origin);
        arrowHelper.setColor(0x00ff00);
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

    // set pos for tri index
    var setTri = function (geometry, triIndex, pos) {
        pos = pos || {};
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY
    var geometry = new THREE.SphereGeometry(0.5, 10, 10);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
                wireframe: true,
                color: 'red',
                side: THREE.DoubleSide
            }));
    scene.add(mesh);

    var position = geometry.getAttribute('position'),
    normal = geometry.getAttribute('normal');
    console.log(position.count);
    console.log(position.array.length / 3);
    console.log(normal.count);

    var position = geometry.getAttribute('position');
    var vertIndex = 20; //Math.floor(position.count * Math.random());
    var normalPos = getNormalPos(geometry, vertIndex);

    var helper = new THREE.ArrowHelper();
    scene.add(helper);
    setArrowHelperToNormal(geometry, helper, vertIndex);

    var pos = {
        x: position.array[vertIndex * 3] + normalPos[0] * 0.1,
        y: position.array[vertIndex * 3 + 1] + normalPos[1] * 0.1,
        z: position.array[vertIndex * 3 + 2] + normalPos[2] * 0.1
    };

    setVert(geometry, vertIndex, pos);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0.7, 0.75, 1);
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
