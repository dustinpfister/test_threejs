
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    // length
    var r = Math.PI / 180 * 45,
    x = Math.cos(r),
    y = Math.sin(r),

    vec = new THREE.Vector3(x, y, 0);

    console.log(vec.isVector3); // true
    console.log(vec.x, vec.y, vec.z); // 0.70... 0.70... 0
    console.log(vec.length()); // 1

    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true
            }));
    scene.add(cube);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var loop = function () {
        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);
    };

    loop();
}
    ());
