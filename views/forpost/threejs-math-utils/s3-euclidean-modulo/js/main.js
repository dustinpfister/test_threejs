(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // USING THE RANDFLOAT and euclideanModulo METHODs
    var i = 0,
    len = 30;
    while(i < len){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        scene.add(mesh);
        var x = THREE.MathUtils.randFloat(-7, 7);
        x = -4.5 + THREE.MathUtils.euclideanModulo(x, 9);
        var z = THREE.MathUtils.randFloat(-100, 100);
        z = -4.5 + THREE.MathUtils.euclideanModulo(z, 9);
        mesh.position.set(x, 0, z)
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());