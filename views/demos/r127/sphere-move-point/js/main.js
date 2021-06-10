
(function () {

    var forAllVerts = function (geometry, func) {
        var position = geometry.getAttribute('position'),
        i = 0,
        len = position.count;
        func = func || function () {};
        while (i < len) {
            var slice = position.array.slice(i * 3, i * 3 + 3);
            func(slice, i, geometry);
            i += 1;
        }
    };

    // return an array of index values for points that are the same
    // for the given vert index
    var getAllForVert = function (geometry, vertIndex) {
        var position = geometry.getAttribute('position');
        var compareSlice = position.array.slice(vertIndex * 3, vertIndex * 3 + 3);
        var compareStr = compareSlice.join(',');
        var index = [];
        forAllVerts(mesh.geometry, function (slice, i) {
            //console.log(i, slice.join());
            if (compareStr === slice.join(',')) {
                index.push(i);
            }

        });
        return index;
    };

    // creating a scene
    var scene = new THREE.Scene();

    // mesh
    var mesh = new THREE.Mesh(
            // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
            new THREE.SphereGeometry(0.5, 8, 8),
            // standard material
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040
            }));

    //forAllVerts(mesh.geometry, function (slice, i) {
    //    console.log(i, slice.join());
    //});

    var i = 0;
    var position = mesh.geometry.getAttribute('position');
    while (i < position.count) {
        console.log(getAllForVert(mesh.geometry, i).length);
        i += 1;
    }

    scene.add(mesh); // add the mesh to the scene

    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 1, 0.75);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
