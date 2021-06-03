
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(3, 1, 3);

    // creating an instance of Object3D
    var obj = new THREE.Object3D();

    // a mesh that inherits from Object3D
    var low = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    low.position.y = -1;
    obj.add(low);

    var high = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    high.rotation.set(0, 1, 0);
    obj.add(high);

    scene.add(obj);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);


    // Orbit Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.lookAt(0,  - .5, 0);

    // loop
    var frame = 0,
    maxFrame = 100;
    var loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

        high.rotation.set(0, Math.PI * 2 * per, 0);
        low.rotation.set(0, -Math.PI * 2 * per, 0);
        obj.position.set(0, -1 + 2 * bias, 0);

        frame += 1;
        frame = frame % maxFrame;

    };

    renderer.render(scene, camera);
    loop();

}
    ());
