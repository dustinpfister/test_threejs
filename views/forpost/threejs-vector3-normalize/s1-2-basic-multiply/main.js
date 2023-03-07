
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));

    var dir = new THREE.Vector3(-20, 0, 0);
    // NORMALIZING DIR FROM -20,0,0 to -1,0,0
    dir.normalize();
    console.log(Object.values(dir)); // [-1, 0, 0]

    // cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // MULTIPLYING DIR BY 2
    cube.position.copy( dir.multiplyScalar(2) );
    scene.add(cube);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
