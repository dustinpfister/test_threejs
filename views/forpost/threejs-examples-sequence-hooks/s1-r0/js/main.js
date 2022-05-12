
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(15, 15));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(10, 10, 10);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    camera.lookAt(0, 2, 0);


    // render
    renderer.render(scene, camera);
}
    ());