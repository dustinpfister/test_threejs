
(function () {

    // Scene
    var scene = new THREE.Scene();
    // ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
    var grid = new THREE.GridHelper(10, 10);
    grid.layers.enableAll(); // enable all will set all layers true
    scene.add(grid);

    // ADDING A MESH FOR LAYER 0 ONLY
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 'red'
            }));

    mesh.add(new THREE.BoxHelper(mesh));
    mesh.position.set(-2, 0, 0);
    mesh.layers.set(0); // this is the default actually just making it explicit
    scene.add(mesh);

    // ADDING A MESH FOR LAYER 1 ONLY
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 'lime'
            }));
    mesh.add(new THREE.BoxHelper(mesh));
    mesh.position.set(2, 0, 0);
    mesh.layers.set(1); // setting to player 1 only
    scene.add(mesh);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var lt = new Date(),
    layerModes = [[0], [1], [0, 1]],
    layerModeIndex = 0;

    var setToLayerMode = function (obj, index) {
        obj.layers.disableAll();
        layerModes[index].forEach(function (layerNum) {
            obj.layers.enable(layerNum);
        });
    };

    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1) {
            setToLayerMode(camera, layerModeIndex);
            layerModeIndex += 1;
            layerModeIndex %= layerModes.length;
            renderer.render(scene, camera);
            lt = now;
        }
    };
    setToLayerMode(camera, layerModeIndex);
    renderer.render(scene, camera);
    loop();

}
    ());
