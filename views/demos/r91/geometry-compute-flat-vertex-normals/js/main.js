
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

    // create vertices with Vector3
    geometry.vertices.push(
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1));

    // faces are made with the index
    // values of from the vertices array
    geometry.faces.push(
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4));

    geometry.normalize();
    geometry.computeFlatVertexNormals();

    //var geometry = new THREE.BoxGeometry(1, 1, 1);

    //console.log(geometry);

    var cube = new THREE.Mesh(

            geometry,

            // Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            }));
    scene.add(cube);

    /*
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
     */

    var helper = new THREE.VertexNormalsHelper(cube, 2, 0x00ff00, 1);

    scene.add(helper);

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
