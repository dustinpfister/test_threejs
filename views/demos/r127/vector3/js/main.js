
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    // CREATING AN INSTANCE OF Vector3 WITH
    // THE THREE.Vector3 CONSTRUCTOR
    var r = Math.PI / 180 * 90,
    x = Math.cos(r) * 2,
    z = Math.sin(r) * 2;
    var vec = new THREE.Vector3(x, 0, z);

    // PROPERTIES OF Vector3
    console.log(vec.isVector3); // true
    console.log(vec.x, vec.y, vec.z); // 0.70... 0.70... 0
    console.log(vec.length()); // 1

    // THE POSITION PROPERTY OF A MESH (OR ANYTHING BASED OFF OF OBJECT3D )
    // IS AN INSTANCE OF Vector3 SO I CAN USE THE Vector3.copy METHOD TO
    // COPY THE VALUES OF A STAND ALONE INSTANCE OF Vector3 TO THE INSTANCE
    // OF Vector3 STORED IN THE POSITON PROPERTY OF A MESH TO SET THE POSTION
    // OF THE MESH
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube.position.copy(vec);
    scene.add(cube);

    // I CAN ALSO USE THE Vector3.set METHOD OF THE INSTNACE OF Vector3 IN THE
    // POSIITON PROPERTY TO SET THE POSIITON OF THE MESH WITH NUMBERS IN THE FORM
    // OF NUMBER LITERALS AND/OR VARIABLES
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube2.position.set(2, 0, 0);
    scene.add(cube2);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
