(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer(): new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10);
    grid.layers.enableAll();
    scene.add(grid);
    //-------- ----------
    // SINGLE MESH FOR LAYER 1
    //-------- ----------
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh.layers.set(1);
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    let cameraLayer = 0;
    const update = function () {
        camera.layers.set(cameraLayer);
        renderer.render(scene, camera);
        cameraLayer += 1;
        cameraLayer %= 2;
    };
    update();
    setInterval(update, 1000);
}
    ());
