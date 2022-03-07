(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mkMesh = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    // center mesh
    scene.add(mkMesh());
    // adding a vector to this mesh position
    var mesh1 = mkMesh();
    mesh1.position.add(new THREE.Vector3(3, 0, 2));
    scene.add(mesh1);
   // using set, normalize, and multiplyScalar
    var mesh2 = mkMesh();
    mesh2.position.set(-1,0,-1).normalize().multiplyScalar(6);
    scene.add(mesh2);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);

}
    ());