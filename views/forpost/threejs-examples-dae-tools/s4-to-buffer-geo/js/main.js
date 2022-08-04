
(function () {
    //******** **********
    // SCENE, CAMERA RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // DAE OBJECTS
    //******** **********
    var i = 0;
    var daeObjects = DAE.create({
        onLoad: function(daeObjects, results){
             // THE getBufferGeoText method can be used to get buffer geometry text
             var text = DAE.getBufferGeoText(daeObjects, 2, 0);
             // this text can then be used to create a JSON file that will work with the
             // THREE.BufferGeomertyLoader or I can pass it to the DAE.fromBufferGeoText method
             console.log(text);
             // back to geo
             var geo = DAE.fromBufferGeoText(text);
             console.log(geo);
             // mesh from geo
             var mesh = new THREE.Mesh(geo);
             scene.add(mesh);
             // render
             renderer.render(scene, camera);
        }
    });
    //******** **********
    // load all
    //******** **********
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae',
        relUrls: [
            'rpi4/rpi4_start_box.dae',
            'obj/obj.dae',
            'box_house_1/box_house1_solid.dae'
        ]
    });
}
    ());
