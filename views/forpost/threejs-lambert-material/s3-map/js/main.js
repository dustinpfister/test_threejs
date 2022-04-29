(function () {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // data texture
    var width = 16,
    height = 16;
    var size = width * height;
    var data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        var stride = i * 4;
        var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v;
        data[stride + 1] = v;
        data[stride + 2] = v;
        data[stride + 3] = 255;
    }
    var texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1500, 1500, 8, 8),
            new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: texture,
                emissive: 0x004a4a,
                emissiveIntensity: 0.75,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    scene.add( new THREE.AmbientLight(0xffffff, 0.05));
    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff, 1, 300, Math.PI / 180 * 40, 1, 0),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    spotLight.position.set(150, 200, -100);
    spotLightHelper.update();

    // render
    renderer.render(scene, camera);

}
    ());
