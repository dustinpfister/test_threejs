
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(250, 200, 250);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // Geometry
    var geometry = new THREE.BoxGeometry(200, 200, 200);

    // Material
    var material = new THREE.MeshNormalMaterial({
            //color: 0xff0000,
            //wireframe: true
        });

    // Mesh
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Loop
    var loop = function () {

        requestAnimationFrame(loop);

        controls.update();

        renderer.render(scene, camera);

    };

    loop();
}
    ());
