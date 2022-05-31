
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');

    //LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(dl);

    // point light
    //var pl = new THREE.PointLight(0xffffff);
    //pl.position.set(2, 5, 3);
    //scene.add(pl);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
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
    // USING DAE TOOLS TO LOAD THE *.dae file
    var daeObjects = DAE.create();
    DAE.loadOne(daeObjects, "/dae/sphere-normal-invert/sphere-normal-invert.dae")
    .then(function(daeObjects){
        var group = DAE.createGroup(daeObjects, 0);
        scene.add(group);

        // OPTION1 - REPLACE MATERIAL WITH BASIC MATERIAL?
        // A crude fix for this can be just be replacing the material
        // with the basic material, using the THREE.DoubleSide valu for the
        // side value
        var mesh = group.children[0];
        mesh.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: null
        });

        // OPTION2 - MUTATE PHONG MATERIAL 
        //var material = group.children[0].material;
        //material.side = THREE.DoubleSide;

        //console.log(material);

        loop();
    })
    .catch(function(e){
        console.log(e);
        loop();
    });


}
    ());
