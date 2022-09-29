(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    let scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
    let camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(-8, 8, 8);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    scene.add(camera);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1) );
    scene.add(mesh1);
    // v1 and v2 vectors
    const v1 = new THREE.Vector3(-5, 0, 0);
    const v2 = new THREE.Vector3(5, 0, 0);
    // position mesh1 at 0.25 alpha between v1 and v2
    mesh1.position.copy(v1).lerp( v2, 0.25);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());