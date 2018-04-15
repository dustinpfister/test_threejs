
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-1, 1, 1);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    var a = new THREE.Vector3(5, 5, 5),
    b = new THREE.Vector3(-5, -5, -5);

    var geometry = new THREE.Geometry();

    geometry.vertices.push(a, b);
    geometry.normalize();

    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));

    scene.add(line);

    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true
            }));

    cube.scale.set(.1,.1,.1);
    scene.add(cube);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        controls.update();

        renderer.render(scene, camera);

    };

    loop();
}
    ());
