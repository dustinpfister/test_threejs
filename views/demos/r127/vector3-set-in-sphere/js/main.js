
(function () {

    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };

    var createCubeSphere = function(){
        var i = 0,
        len = 10;
        while(i < len){
            cube = createCube();
            i += 1;
        }
        return group;
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));


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
