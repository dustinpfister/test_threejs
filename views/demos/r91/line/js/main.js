
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0,0,-3);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0));

    var line = new THREE.Line(geometry, material);
    scene.add(line);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var loop = function () {

        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);

    };

    loop();

}
    ());
