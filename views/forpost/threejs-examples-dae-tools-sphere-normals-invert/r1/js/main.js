
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 5, 10);

    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);

    // CONTROL
    var controls = new THREE.OrbitControls(camera, renderer.domElement);


    var frame = 0, frameMax = 300;

    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);

/*
        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;
        var r = Math.PI * 2 * per;
        var x = Math.cos(r) * 10;
        var z = Math.sin(r) * 10;

        camera.lookAt(x, 15 - 15 * bias, z);

*/
        frame += 1;
        frame %= frameMax;

        controls.update();
    };
    // USING DAE TOOLS TO LOAD THE *.dae file
    var daeObjects = DAE.create();
    DAE.loadOne(daeObjects, "/dae/sphere-normal-invert/sphere-normal-invert-two.dae")
    .then(function(daeObjects){
        var group = DAE.createGroup(daeObjects, 0);
        scene.add(group);

        var mesh = group.children[0];


        // OPTION3 - REPLACE WITH BASIC MATERIAL, USING MAP VALUE 
        // FROM DAE FILE IMPORT
        var sourceMaterial = mesh.material;
        var newMaterial = new THREE.MeshBasicMaterial({
            map: sourceMaterial.map
        });
        mesh.material = newMaterial;

        // BASE GROUND MESH
        var baseGround = new THREE.Mesh( new THREE.BoxGeometry(1, 0.1, 1), new THREE.MeshPhongMaterial({
             color: 0x00ff00
        }));
        baseGround.position.y = -0.125;
        baseGround.scale.set(60, 1, 60);
        scene.add(baseGround);

        loop();
    })
    .catch(function(e){
        console.log(e);
        loop();
    });


}
    ());
