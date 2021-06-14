
(function () {

    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };

    var setPosByDirAndLength = function(obj, dir, len){
        var v = dir.normalize().multiplyScalar(len);
        return obj.position.copy(v);
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    var cube = createCube();
    scene.add(cube);
    var dir = new THREE.Vector3(-5, 5, -5);
    setPosByDirAndLength(cube, dir, 4);
    console.log( cube.position.length() ); // 4

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
