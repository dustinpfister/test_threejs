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
    scene.add(mkMesh());

    var m1 = mkMesh();
    m1.position.set(0, 0, 4);
    scene.add(m1);
    var m2 = mkMesh();
    var d = m1.position.distanceTo(new THREE.Vector3(0,0,0));
    m2.position.copy(m1.position).normalize().multiplyScalar(d / 2);
    console.log(m2.position);
    scene.add(m2);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);

}
    ());