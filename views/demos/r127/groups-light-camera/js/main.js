
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 50);
    camera.position.set(10, 10, 10);
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
    withCamera.position.set( - .25, .2,  - .75);
    camera.add(withCamera);

    // adding another mesh object directly to the scene
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            new THREE.MeshStandardMaterial({
                color: 0x00ff00
            })));

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var frame = 0,
    maxFrame = 500;
    var loop = function () {
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        withCamera.rotation.set(Math.PI * 4 * per,
            Math.PI * 2 * per, 0);
        frame += 1;
        frame = frame % maxFrame;
    };
    loop();

}
    ());
