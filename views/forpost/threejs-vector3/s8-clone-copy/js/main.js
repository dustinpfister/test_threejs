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

    // using the vector3 copy method to copy position
    // of m1 to position of m2
    var m1 = mkMesh();
    m1.position.set(2,0,0)
    scene.add(m1);
    var m2 = mkMesh();
    m2.position.copy(m1.position);
    m2.position.y = 2;
    scene.add(m2);

    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);

}
    ());