
(function () {

    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    // creating a cube and adding it to the scene
    var cube = createCube();
    scene.add(cube);
    // USING THE APPLY EULER Vector3 METHOD
    var e = new THREE.Euler(
        THREE.MathUtils.degToRad(45),
        THREE.MathUtils.degToRad(0), 
        THREE.MathUtils.degToRad(0));
    var v = new THREE.Vector3(1, 0, 0).applyEuler(e).normalize().multiplyScalar(3);
    cube.position.copy(v);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
