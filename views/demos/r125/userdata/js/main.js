
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
        mesh.userData.pitchPPS = 0;
        mesh.userData.pitch = Math.PI / 180 * 270;
        mesh.userData.heading = Math.PI / 180 * 180;
        group.add(mesh);
        return group;
    };

    var updateSphereGroup = function(group, secs){
        group.children.forEach(function(mesh){
            mesh.material = materials[mesh.userData.materalIndex];
            mesh.position.x += Math.cos(mesh.userData.pitch) * mesh.userData.pitchPPS;
            mesh.position.y += Math.sin(mesh.userData.pitch) * mesh.userData.pitchPPS;
            mesh.position.z += Math.cos(mesh.userData.heading) * mesh.userData.headingPPS;
        });
    };


    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // create and add sphere group
    var group = createSphereGroup();
    updateSphereGroup(group, 0);
    scene.add(group);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    var lt = new Date();
    function animate() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(animate);
        controls.update();
        updateSphereGroup(group, secs);
        renderer.render(scene, camera);
        lt = now;
    };

    animate();

}
    ());
