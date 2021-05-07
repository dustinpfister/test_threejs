(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0000ff);

    // mesh in wire frame mode
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xffffff, // color is white
                emissive: 0x0000df, // emissive color is like the background color
                wireframe: true
            }));
    scene.add(mesh);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 1);
    camera.add(light)
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
