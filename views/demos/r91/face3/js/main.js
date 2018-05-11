
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 2, 1);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    var material = new THREE.MeshNormalMaterial();

    //create a triangular geometry
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-1, -1, 0));
    geometry.vertices.push(new THREE.Vector3(1, -1, 0));
    geometry.vertices.push(new THREE.Vector3(1, 1, 0));

    //create a new face using vertices 0, 1, 2
    var normal = new THREE.Vector3(0, 0, 1), //optional
    color = new THREE.Color(0xffaa00), //optional
    materialIndex = 0, //optional

    face = new THREE.Face3(0, 1, 2, normal, color, materialIndex);

    //add the face to the geometry's faces array
    geometry.faces.push(face);

    geometry.computeVertexNormals();
    geometry.computeFaceNormals();

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
