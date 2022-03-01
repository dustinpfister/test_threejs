(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 8, 12);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // SPOTLIGHT WITH HELPER
    // ---------- ----------
    var spotLight = new THREE.SpotLight(new THREE.Color('white'), 0.5, 10, 0.5, 1);
    spotLight.position.set(3, 3, 0);
    spotLight.add(new THREE.SpotLightHelper(spotLight))
    scene.add(spotLight);
   // MESH OBJECTS
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 1, 0);
    scene.add(cube);
    var floor = new THREE.Mesh(
            new THREE.BoxGeometry(10, 1, 10),
            new THREE.MeshStandardMaterial({
                color: 0x008800
            }));
    scene.add(floor);
    // RENDER
    renderer.render(scene, camera);
}());