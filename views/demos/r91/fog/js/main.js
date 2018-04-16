
(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 0.0025,15);

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // Geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // Material
    var material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            emissive : 0x000000
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
