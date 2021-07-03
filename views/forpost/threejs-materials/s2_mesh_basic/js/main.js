(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
 
// CUBE
scene.add(new THREE.Mesh(
    // box GEOMETRY
    new THREE.BoxGeometry(1, 1, 1),
    // basic MATERIAL
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
));
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1.4, 4);
    camera.position.set(1.3, 1.5, 1.3);
    camera.lookAt(0, 0, 0);

// add controls for the camera
var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        // UPDATE CONTROLS
        controls.update();
        renderer.render(scene, camera);
    };
    loop();
 
}
    ());