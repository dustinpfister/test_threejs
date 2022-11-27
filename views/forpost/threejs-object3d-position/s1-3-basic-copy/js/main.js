(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    // mesh
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SOME INSTANCES OF Vector3 THAT I would like to COPY to other Vector3 instances
    const v1 = new THREE.Vector3(-4, -0.5, 4);
    const v2 = new THREE.Vector3( 5, 5, 5);
    // COPYING v1 TO THE POSITION OF THE MESH
    mesh.position.copy(v1)
    // COPYING V1 TO THE CAMERA AND THEN ADDING v2
    camera.position.copy(v1).add(v2);
    camera.lookAt(v1);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());