(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 2, 1);
    camera.lookAt(0, 0, 0);
 
    // GEOMETRY
    var geometry = new THREE.Geometry();
 
    // vertices made with Vector3
    geometry.vertices = [
        new THREE.Vector3(-1, -1, 0),
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(1, 1, 0)
    ];
 
    // face 3 arguments assigned to variable with comments
    var a = 0, // vert index a
    b = 1, // vert index b
    c = 2, // vert index c
    normal = new THREE.Vector3(0, 0, 1), // this sets the face normal
    color = new THREE.Color(0xffaa00), // sets a face color
    materialIndex = 0, // useful when working with an array of materials
 
    // FACE3 example
    face = new THREE.Face3(a, b, c, normal, color, materialIndex);
 
    //add the face to the geometry's faces array
    geometry.faces.push(face);
 
    // compute face and vertex normals
    geometry.computeVertexNormals();
    geometry.computeFaceNormals();
 
    // create a mesh using the geometry
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    // adding face and vertex normals helper so I can
    // see what is going on with the normals
    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());