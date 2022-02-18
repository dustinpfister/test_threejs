(function () {
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8))

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