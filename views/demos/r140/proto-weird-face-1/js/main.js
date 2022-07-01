
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 1, 2);
    camera.lookAt(0, 0, 0);

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


        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;
       
        frame += 1;
        frame %= frameMax;

        //controls.update();
    };
    // USING DAE TOOLS TO LOAD THE *.dae file
    var daeObjects = DAE.create();

    DAE.loadOne(daeObjects, "/dae/weird-face-1/weird-face-1b.dae")
    .then(function(daeObjects){


        var rScene = daeObjects.results[0].scene;
        var nose = rScene.getObjectByName('nose');

console.log(nose)
scene.add(nose)

        loop();
    })
    .catch(function(e){
        console.log(e);
        loop();
    });


}
    ());
