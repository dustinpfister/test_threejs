
(function () {

    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            wireframe: true
        })
    ];

    // random angles helper
    var randomAngles = function(mesh){
        mesh.userData.pitch = Math.PI * 2 * Math.random();
        mesh.userData.heading = Math.PI * 2 * Math.random();
    };

    var createSphereGroup = function(){
        var group = new THREE.Group();
        var i = 0;
        while(i < 6){
            var mesh = new THREE.Mesh(
                new THREE.SphereGeometry(1, 20),
                materials[0]
            );
            mesh.userData.materalIndex = i % materials.length;
            mesh.userData.pitchPPS = 2;
            mesh.userData.headingPPS = 2;
            randomAngles(mesh);
            group.add(mesh);
            i += 1;
        }
        return group;
    };

    var updateSphereGroup = function(group, secs){
        group.children.forEach(function(mesh){
            var ud = mesh.userData;
            mesh.material = materials[ud.materalIndex];
            mesh.position.x += Math.cos(ud.pitch) * ud.pitchPPS * secs;
            mesh.position.y += Math.sin(ud.pitch) * ud.pitchPPS * secs;
            mesh.position.z += Math.cos(ud.heading) * ud.headingPPS * secs;
            var d = mesh.position.distanceTo(new THREE.Vector3(0,0,0));
            if(d >= 3){
                mesh.position.set(0,0,0);
                randomAngles(mesh);
            }
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
