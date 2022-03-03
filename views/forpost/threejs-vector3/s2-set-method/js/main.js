(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    // creating a mesh called cube and adding it to a scene
    // by default it will be located at 0,0,0
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(cube);
    // creating a mesh called cube2 and adding it to the scene
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // USING THE SET METHOD OF THE Vector3 INSTANCE
    // AT THE POSITON PROPERTY OF MESH OBJECT cube2
    // TO SET THE POSTION OF cube2
    cube2.position.set(2, 0, 0);
    scene.add(cube2);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    // USING THE SET METHOD TO SET THE POSITION OF THE CAMERA
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}());
