
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);

    // I need a mesh that will tie a geometry and material together
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 100, 0);
    scene.add(cube);

    // set up a render
    var renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    // background
    scene.background = new THREE.Color(0x0f0f0f);

    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 350, 0);
    scene.add(spotLight);

    // add a cube that will serve at showing me where
    // the spotlight is
    spotLight.add(new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })));

    spotLight.position.set(350, 340, 170);

    // set the position of the camera away from the cube, and
    // look at the cube.
    camera.position.set(500, 500, 500);
    camera.lookAt(cube.position);
    renderer.setSize(320, 240);

    // render what we have
    renderer.render(scene, camera);

}
    ());
