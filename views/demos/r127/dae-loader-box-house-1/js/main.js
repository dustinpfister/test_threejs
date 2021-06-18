
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');

    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    scene.add(pl);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
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
    loader.load("/dae/box_house_1/box_house1.dae", function (result) {
        // adding what I want from the result
        //scene.add(result.scene);

        var group = new THREE.Group();
        result.scene.children.forEach(function(obj){
            if(obj.type === 'Mesh'){
                console.log(obj.type);
                group.add(obj.clone());
            }
        });
        scene.add(group);
        group.rotation.copy(result.scene.rotation);

        console.log(result)


        // start the app loop
        loop();
    });

}
    ());
