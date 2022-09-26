(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT WITH x,y,z props
    mesh.position.x = 4;
    mesh.position.y = 0.5;
    mesh.position.z = 4;
    // A Camera can also be set this way
    camera.position.z = 8;
    camera.position.y = 8;
    // look at 0,0,0
    camera.lookAt( 0, 0, 0 );
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());