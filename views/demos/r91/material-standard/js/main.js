
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // CUBE
    scene.add(new THREE.Mesh(

            // box GEOMETRY
            new THREE.SphereGeometry(1, 20, 20),

            // phong MATERIAL
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x2a0000
            })));

    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-.125, 1.25, 1.25);
    scene.add(spotLight);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
