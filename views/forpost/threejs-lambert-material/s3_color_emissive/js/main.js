(function () {
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
 
    // Cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({
                color: 0xff0000,
                emissive: 0x2a0000,
                emissiveIntensity: 0.5,
            }));
    cube.position.set(0, 100, 0);
    scene.add(cube);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // background
    scene.background = new THREE.Color(0x000000);
 
    // add plane to the scene
    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1500, 1500, 8, 8),
        new THREE.MeshLambertMaterial({
            color: 0x00afaf,
            emissive: 0x2a2a2a,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
    }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
 
    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight(),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
 
    // set position of spotLight,
    // and helper bust be updated when doing that
    spotLight.position.set(100, 200, -100);
    spotLightHelper.update();
 
    renderer.render(scene, camera);
 
}
    ());