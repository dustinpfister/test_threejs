(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // ADD CAMERA TO SCENE
    //-------- ----------
    scene.add(camera)
    //-------- ----------
    // ADD LIGHT TO CAMERA
    //-------- ----------
    // positioning a light above the camera
    const light = new THREE.PointLight();
    light.position.set(0, 5, 0);
    camera.add(light);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    // positioning a mesh in front of the camera
    const withCamera = new THREE.Mesh(
            new THREE.BoxGeometry(.1, .1, .1),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0x1a1a1a
            }));
    withCamera.position.set(-0.25, .2, -0.75);
    camera.add(withCamera);
    // adding another mesh object directly to the scene
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0x00ff00
            })));
    //-------- ----------
    // LOOP
    //-------- ----------
    let frame = 0;
    const maxFrame = 500;
    const loop = function () {
        const per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        withCamera.rotation.set(Math.PI * 4 * per,
            Math.PI * 2 * per, 0);
        camera.position.set(-2 + 8 * bias, 8, 8);
        camera.lookAt(0, 0, 0);
        frame += 1;
        frame = frame % maxFrame;
        renderer.render(scene, camera);
    };
    loop();
}
    ());