(function () {
    // ********** **********
    // SCENE, CAMERA, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(0.9, 0, 3.5);
    camera.lookAt(-1, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // CREATE MESH OBJECTS
    // ********** **********
    var createCube = function (size, material, x, y, z) {
        var geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    var materials = {};
    materials.sand = new THREE.MeshBasicMaterial({
        color: 'yellow'
    });
    materials.glass = new THREE.MeshBasicMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
    var glassCube = createCube(1, materials.glass, 0, 0, 2),
    cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    // ********** **********
    // RENDER
    // ********** **********
    renderer.render(scene, camera);
}());
