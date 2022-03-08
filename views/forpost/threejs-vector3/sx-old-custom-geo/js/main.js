(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-7, 4, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 3, 1),
            new THREE.MeshNormalMaterial());
    };

    var geometry = new THREE.Geometry();
 
    // create vertices with Vector3
    geometry.vertices.push(
        new THREE.Vector3(5, 3, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(1, -3, 1),
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

    var mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());
    mesh.scale.set(6,6,6)
    scene.add(mesh);

    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);

}
    ());