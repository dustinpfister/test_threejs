
(function () {

    // Scene
    var scene = new THREE.Scene();
    // adding helpers
    var helper = new THREE.GridHelper(10, 10, 'lime', '#ffffff');
    scene.add(helper);
    helper = new THREE.GridHelper(10, 10, 'lime', '#2a2a2a');
    helper.rotation.z = Math.PI * 0.5;
    scene.add(helper);

    // camera, renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
