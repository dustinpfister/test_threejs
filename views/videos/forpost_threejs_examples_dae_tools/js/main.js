
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
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);


    // create daeObjects state object
    var i = 0;
    var daeObjects = DAE.create({
        onLoad: function(daeObjects, results){
            // set up all dae groups
            results.forEach(function(result, i){
                var group = DAE.createGroup(daeObjects, result);
                group.position.z = 3 - 6 * i;
                scene.add(group);
            });
            // load VIDEO UI Object
            videoUI.load({
                frame: 0,
                canvas: renderer.domElement,
                sequence: sequence
            });
        }
    });

    // create sequences
    var sequence = [];
    sequence.push({
        maxFrame: 30,
        forFrame: function(seq){
            camera.position.set(20 - 40 * seq.bias, 20, 20);
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        }
    });

    // start loading dae files
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae',
        relUrls: [
            'rpi4/rpi4_start_box.dae',
            'obj/obj.dae'
        ]
    });


}
    ());
