
(function () {

    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(4.2, 3.4, 1.7);

    // scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
    // ADD THE SPOTLIGHT TO THE SCENE
    scene.add(spotLight);

    // A MESH with Lambert Material
    // which responds to a light source.
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    scene.add(cube);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // render what we have
    renderer.render(scene, camera);

}
    ());
