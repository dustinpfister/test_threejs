
(function () {

    // Scene
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(250, 200, 250);
    camera.lookAt(0, 0, 0);

    // add controls for the camera
    var controls = new THREE.OrbitControls(camera);

    // I will need a geometry, in this case BoxGeometery
    var geometry = new THREE.BoxGeometry(200, 200, 200);

    // I will need a material for the cube
    var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

    // I need a mesh that will tie a geometry and material together
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.setSize(320, 240);

    // finally I call renderer.render to draw the current
    // state of the scene, from the perspective of the camera
    function animate() {

        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);

    };

    animate();

}
    ());
