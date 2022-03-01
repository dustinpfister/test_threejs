(function () {
 
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10))
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(10, 20, 20);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
 
    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff, 3, 20, Math.PI * 0.25, 1);
    spotLight.position.set(8, 8, 0);
    spotLight.add( new THREE.SpotLightHelper(spotLight));
    scene.add(spotLight);
 
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    scene.add(cube);

    // render what we have
    renderer.render(scene, camera);
 
}
    ());