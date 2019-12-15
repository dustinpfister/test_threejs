
(function () {

    // scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // I will need a material for the cube
    var materials = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

    var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials[0]);
    scene.add(cube);

    camera.position.set(2, 2, 2);
    camera.lookAt(cube.position);
    renderer.setSize(320, 240);

    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}
    ());
