
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
            new THREE.BoxGeometry(1, 1, 1),

            // basic MATERIAL
            new THREE.MeshPhongMaterial({
                color: 0x00ff00,
                emissive: 0x00008a
            })));

    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-3, 2, 3);
    scene.add(spotLight);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
