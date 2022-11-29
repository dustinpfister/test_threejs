
(function () {
    // scene
    var scene = new THREE.Scene();

    // GEOMETRY
    var geometry = new THREE.Geometry();
    // create an array of vertices by way of
    // and array of vector3 instances
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, -1, 0));
    // FACE3
    geometry.faces.push(
        new THREE.Face3(0, 1, 2),  // THIS IS FACING ONE WAY
        new THREE.Face3(5, 4, 3)); // THIS IS FACING THE OTHER WAY
    // compute Normals
    geometry.computeVertexNormals();
    geometry.computeFaceNormals();
    geometry.normalize(); // normalize the geometry

    // MESH with GEOMETRY, and Normal MATERIAL
    var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));
    // renderer, camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
