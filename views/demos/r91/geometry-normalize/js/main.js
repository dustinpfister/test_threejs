
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // create a box geometry
    var geometry = new THREE.Geometry();

    geometry.vertices.push(

        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(0, 5, 0));

    geometry.faces.push(

        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 0, 2));

    // geometry is not centered, and it ranges
    // out of the range of 1
    console.log(geometry.vertices[0].x); // 0
    console.log(geometry.vertices[1].x); // 5

    // normalize
    geometry.normalize();
    geometry.computeVertexNormals();

    // geometry is now centered to the origin
    // and is inside the range of one
    console.log(geometry.vertices[0].x); // -0.707...
    console.log(geometry.vertices[1].x); // 0.707...


    // MESH with Geometry, and Basic Material
    scene.add(new THREE.Mesh(

            geometry,

            // Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            })));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
