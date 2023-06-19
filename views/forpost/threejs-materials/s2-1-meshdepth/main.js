(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) )
    scene.background = new THREE.Color('blue');
    // NEAR AND FAR VALUES MATTER WITH THE DEPTH MATERIAL
    var near = 0.5,
    far = 100;
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, near, far);
    camera.position.set(1.3, 1.5, 1.3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // INSTANCE OF THE DEPTH MATERIAL
    var material = new THREE.MeshDepthMaterial();
    // MESH with Box Geometry with the 
    scene.add(new THREE.Mesh(
        // box GEOMETRY
        new THREE.BoxGeometry(1, 1, 1),
        material
    ));
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        controls.update();         // UPDATE CONTROLS
        renderer.render(scene, camera); // render
    };
    loop();
}
    ());