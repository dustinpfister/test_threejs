
(function () {

    var setNormal = function (geometry, normalIndex, pos) {
        var normal = geometry.getAttribute('normal');
        normal.array[normalIndex * 3] = pos.x;
        normal.array[normalIndex * 3 + 1] = pos.y;
        normal.array[normalIndex * 3 + 2] = pos.z;
    };

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                side: THREE.FrontSide //THREE.DoubleSide
            }));

    setNormal(geometry, 0, {x: -1, y: 0.5, z: 0});

    // check out the normal attribute of a cube
    var normal = geometry.getAttribute('normal');
    var position = geometry.getAttribute('position');
    // create and set up an arrow helper to find the direction of the first normal value
    var dir = new THREE.Vector3(normal.array[0], normal.array[1], normal.array[2]),
    origin = new THREE.Vector3(position.array[0], position.array[1], position.array[2]);
    var helper = new THREE.ArrowHelper(dir, origin, 1, 0x00ff00);
    helper.position.copy(origin);

    scene.add(mesh);
    scene.add(helper);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
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
