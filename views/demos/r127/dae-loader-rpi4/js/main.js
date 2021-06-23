
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');

    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    scene.add(pl);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    // controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        controls.update();
    };

    // CREATE A COLLADALOADER INSTANCE
    var loader = new THREE.ColladaLoader();
    loader.load("/dae/rpi4/rpi4_start_box.dae", function (result) {
        console.log(result.library);
        // create group
        var group = new THREE.Group();
        // copy mesh objects only
        result.scene.children.forEach(function(obj){
            if(obj.type === 'Mesh'){
                console.log(obj.geometry);
                group.add(obj.clone());
            }
        });
        scene.add(group);
        // copy result.scene rotation to group
        group.rotation.copy(result.scene.rotation);
        // start the app loop
        loop();
    });

}
    ());
