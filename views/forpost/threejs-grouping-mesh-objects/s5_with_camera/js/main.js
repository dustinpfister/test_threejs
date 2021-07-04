(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 50);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // adding the camera to the scene
 
    // positioning a light above the camera
    var light = new THREE.PointLight();
    light.position.set(0, 5, 0);
    camera.add(light);
 
    // positioning a mesh in front of the camera
    var withCamera = new THREE.Mesh(
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
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var frame = 0,
    maxFrame = 500;
    var loop = function () {
        var per = frame / maxFrame,
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