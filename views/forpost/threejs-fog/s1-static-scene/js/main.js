(function () {
    // SCNEN
    var scene = new THREE.Scene();

    // ADDING BACKGROUND AND FOG
    fogColor = new THREE.Color(0x00af00);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.5);
 
    // Use a Material that SUPPORTS FOG
    // when making a Mesh such as the standard material
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    scene.add(mesh);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 0.75, 1);
    camera.lookAt(0, 0, 0);
    // adding a point light to the camera
    var light = new THREE.PointLight(0xffffff);
    light.position.y = 0.5;
    camera.add(light);
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
}
    ());