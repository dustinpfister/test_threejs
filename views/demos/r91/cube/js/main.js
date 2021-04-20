
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene();

    // I will need an camera to look at objects in the scene
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);

    // I will need a geometry, in this case BoxGeometery
    var geometry = new THREE.BoxGeometry(200, 200, 200);

    // I will need a material for the cube
    var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

    // I need a mesh that will tie a geometry and material together
    var mesh = new THREE.Mesh(geometry, material);

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    // now that I have everything I need I can call some methods
    // of what I have to set up my scene, camera, and renderer.
    // I must at least add the mesh to the scene, and position the camera
    // in a way so that it is looking at the mesh
    scene.add(mesh);

    // set the position of the camera away from the cube, and
    // look at the origin.
    camera.position.set(250, 200, 250);
    camera.lookAt(0, 0, 0);
    renderer.setSize(320, 240);

    // finally I call renderer.render to draw the current
    // state of the scene, from the perspective of the camera
    renderer.render(scene, camera);

}
    ());
