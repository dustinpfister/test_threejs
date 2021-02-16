
(function () {

    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        })
    ];

    var createSphereGroup = function(){
        var group = new THREE.Group();
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20),
            materials[0]
        );
        mesh.userData.materalIndex = 1;
        group.add(mesh);
        return group;
    };

    var updateSphereGroup = function(group){
        group.children.forEach(function(mesh){
            mesh.material = materials[mesh.userData.materalIndex];
        });
    };


    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // create and add sphere group
    var group = createSphereGroup();
    updateSphereGroup(group);
    scene.add(group);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

}
    ());
