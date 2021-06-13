
(function () {

    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };

    // CREATE AND RETURN A GROUP OF CUBES
    // WHERE EACH CUBE IS POSITIONED IN A
    // CIRCLE AROUND THE CENTER OF THE GROUP
    var createCubeCircle = function(){
        var i = 0,
        x, z, radian, radius = 3,
        len = 10,
        cube,
        group = new THREE.Group();
        while(i < len){
            cube = createCube();
            radian = Math.PI * 2 / len * i;
            x = Math.cos(radian) * radius;
            z = Math.sin(radian) * radius;
            cube.position.set(x, 0, z);
            group.add(cube);
            i += 1;
        }
        return group;
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    var cubeCircle = createCubeCircle();
    scene.add(cubeCircle);

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
