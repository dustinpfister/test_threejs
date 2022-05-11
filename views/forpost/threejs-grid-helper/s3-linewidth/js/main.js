(function () {
    // SCENE
    var scene = new THREE.Scene();

    // GRID HELPER
    var size = 8;
    var divisions = 8;
    var colorLinesCenter = 0xffffff;
    var colorLinesGrid = new THREE.Color('lime');
    var helper = new THREE.GridHelper(size, divisions, colorLinesCenter, colorLinesGrid);
    // SETTING LINE WIDTH OF MATERIAL
    // !!! THIS WLL NOT WORK ON ALL PLATFORMS !!!
    helper.material.linewidth = 6;
    scene.add(helper)

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.1, 100);
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 0, 0);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    renderer.render(scene, camera);
}
    ());