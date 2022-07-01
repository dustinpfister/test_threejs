
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
    var daeObjects = DAE.create({
        onItemProgress: function(per, n, d){
            console.log('progress: ' + per.toFixed(2) + ' ( ' + n + '/' + d + ' )');
        },
        onFileLoad: function(result, allResults, daeObjects){
            console.log('fileLoad');
        },
        onLoad: function(daeObjects, results){

            var rScene = daeObjects.results[0].scene;
            var nose = rScene.getObjectByName('nose');
            scene.add(nose);

            // mouth objects
            var rScene = daeObjects.results[1].scene;
            var m0 = rScene.getObjectByName('mouth-0');
            var m1 = rScene.getObjectByName('mouth-1');
            m0.position.set(-1, 0, 0);
            m1.position.set(-2, 0, 0);
            m0.rotation.set(0, 0, 0);
            m1.rotation.set(0, 0, 0);

            scene.add(m0);
            scene.add(m1);

            loop();
        }
    });

    DAE.loadAll(daeObjects, {
        baseUrl: '/dae/weird-face-1',
        relUrls: ['weird-face-1b.dae', 'mouths-1b.dae']
     });


}
    ());
