
(function () {

    var layerModes = [[0], [1], [2], [0, 1]],
    layerModeIndex = 0;

    var setToLayerMode = function (obj, index) {
        obj.layers.disableAll();
        layerModes[index].forEach(function (layerNum) {
            obj.layers.enable(layerNum);
        });
    };

    var createBoxForLayer = function (layerMode, color, x) {
        var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: color
                }));
        var boxHelper = new THREE.BoxHelper(mesh);
        setToLayerMode(boxHelper, 3);
        mesh.add(boxHelper);
        mesh.position.set(x, 0, 0);
        setToLayerMode(mesh, layerMode);
        return mesh;
    };

    // scene
    var scene = new THREE.Scene();

    // ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
    var grid = new THREE.GridHelper(10, 10);
    grid.layers.enableAll(); // enable all will set all layers true
    scene.add(grid);
    // ADDING A MESH FOR LAYER MODE 0 ONLY
    scene.add(createBoxForLayer(0, 'red', 2));
    // ADDING A MESH FOR LAYER MODE 1 ONLY
    scene.add(createBoxForLayer(1, 'lime', -2));
    // ADDING A MESH FOR LAYER MODE 2 ONLY
    scene.add(createBoxForLayer(2, 'white', 0));

    // camera, and renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var lt = new Date();
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
