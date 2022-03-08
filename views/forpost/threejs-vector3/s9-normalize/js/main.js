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
    var m1 = mkMesh();
    m1.position.set(-3, 1.5,-3);
    scene.add(m1);
    [3, 1.5, 0, -1.5, -3, -4.5,-6].forEach(function(scalar){
        var mX = mkMesh();
        mX.position.copy(m1.position).normalize().multiplyScalar(scalar);
        scene.add(mX);
    });
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);

}
    ());