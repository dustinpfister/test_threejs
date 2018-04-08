
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),

    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),

    // I will need a material for the cube
    material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            //transparent: true,
            //opacity: .5,
            //emissive: 0xffffff
            //wireframe: true
        });

    // I need a mesh that will tie a geometry and material together
    cube = new THREE.Mesh(geometry, material),

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    scene.add(cube);

    // background
    scene.background = new THREE.Color(0x000000);

    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(200, 400, 300);
    scene.add(spotLight);

    // set the position of the camera away from the cube, and
    // look at the origin.
    camera.position.set(180, 180, 180);
    camera.lookAt(0, 0, 0);
    renderer.setSize(320, 240);

    // finally I call renderer.render to draw the current
    // state of the scene, from the perspective of the camera
    renderer.render(scene, camera);

}
    ());
