
(function () {

    var setNormal = function (geometry, normalIndex, pos) {
        var normal = geometry.getAttribute('normal');
        normal.array[normalIndex * 3] = pos.x;
        normal.array[normalIndex * 3 + 1] = pos.y;
        normal.array[normalIndex * 3 + 2] = pos.z;
        normal.needsUpdate = true;
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
        arrowHelper.position.copy(origin);
        arrowHelper.setColor(0x00ff00);
    };

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var normal = geometry.getAttribute('normal');
    console.log(normal);

    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                side: THREE.FrontSide //THREE.DoubleSide
            }));

    scene.add(mesh);

    var pos = {
        x: -1,
        y: -1,
        z: 0
    };

    var helper1 = new THREE.ArrowHelper();
    var helper2 = new THREE.ArrowHelper();
    var helper3 = new THREE.ArrowHelper();
    scene.add(helper1);
    //scene.add(helper2);
    //scene.add(helper3);

    var update = function () {
        setNormal(geometry, 0, pos);
        //setNormal(geometry, 1, pos);
        //setNormal(geometry, 2, pos);
        setArrowHelperToNormal(geometry, helper1, 0);
        //setArrowHelperToNormal(geometry, helper2, 1);
        //setArrowHelperToNormal(geometry, helper3, 2);
    };
    //update();

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var radian = 0;
    var loop = function () {
        requestAnimationFrame(loop);
        radian += Math.PI * 2 / 180 * 1;
        pos.y = Math.sin(radian);
        pos.x = Math.cos(radian);
        update();
        renderer.render(scene, camera);
    };
    loop();

}
    ());
