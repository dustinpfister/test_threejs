(function () {
    // Scene
    var scene = new THREE.Scene();
    // ADDING BACKGROUND AND FOG
    fogColor = new THREE.Color(0x00af00);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.5);
 
    // A Material that DOES SUPPORT FOG
    // being use in a Mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x080808
            }));
    scene.add(mesh);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight(0xffffff));
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
}
    ());