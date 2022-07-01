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

    // app loop
    var frame = 0, frameMax = 300,
    mouth, m0, m1;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;
        frame += 1;
        frame %= frameMax;
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
            // mouth objects
            var rScene = daeObjects.results[1].scene;
            m0 = rScene.getObjectByName('mouth-0');
            m1 = rScene.getObjectByName('mouth-1');
            // mouth is based off of m0
            mouth = new THREE.Mesh(m0.geometry.clone(), m0.material )
            scene.add(mouth);
            // start loop
            loop();
        }
    });

    DAE.loadAll(daeObjects, {
        baseUrl: '/dae/weird-face-1',
        relUrls: ['weird-face-1b.dae', 'mouths-1b.dae']
    });

}
    ());
