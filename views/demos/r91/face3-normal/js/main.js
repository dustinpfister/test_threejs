
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 2, 1);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // GEOMETRY
    var geometry = new THREE.Geometry();

    // create an array of vertices by way of
    // and array of vector3 instances
    geometry.vertices.push(

        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 1, 0),

        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(0, 1, -1));

    // create faces by way of an array of
    // face3 instances. (you just play connect
    // the dots with index values from the
    // vertices array)
	var normal = new THREE.Vector3(0,0,0);
    geometry.faces.push(

        new THREE.Face3(0, 1, 2,new THREE.Vector3(0,0,1)),
        new THREE.Face3(3, 0, 2,new THREE.Vector3(0,0,1)),
        new THREE.Face3(4, 5, 6,new THREE.Vector3(0,0,-1)),
        new THREE.Face3(7, 4, 6,new THREE.Vector3(0,0,-1)),

        new THREE.Face3(0, 4, 1,new THREE.Vector3(0,-1,0)),
        new THREE.Face3(1, 4, 5,new THREE.Vector3(0,-1,0)),
        new THREE.Face3(3, 7, 2,new THREE.Vector3(0,1,0)),
        new THREE.Face3(2, 7, 6,new THREE.Vector3(0,1,0)));

    // compute Normals
    geometry.computeVertexNormals();
	//geometry.computeFaceNormals();


    // normalize the geometry
    geometry.normalize();

    // MESH with GEOMETRY, and Normal MATERIAL

    var mesh = new THREE.Mesh(

            // geometry as first argument
            geometry,

            // then Material
            new THREE.MeshNormalMaterial({
                //side: THREE.DoubleSide
            }));

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
