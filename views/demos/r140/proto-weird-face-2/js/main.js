(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER, LIGHT
    //******** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#444444');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(1.5, 0.25, 1.5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
    //******** **********
    // CONTROL
    //******** **********
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //******** **********
    // APP LOOP
    //******** **********
    var frame = 0, frameMax = 300,
    nose, m0, m1;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax;
        // UPDATE EYES
        var eBias = weridFace.getBias(per, 2);
        var pBias = weridFace.getBias(per, 8);
        var a = -0.10 + 0.20 * eBias;
        weridFace.setEye(nose, 1, a, 0, 0.75 + 0.25 * pBias);
        weridFace.setEye(nose, 2, a, 0, 0.75 + 0.25 * pBias);
        // UPDATE MOUTH
        var mBias = weridFace.getBias(per, 16);
        weridFace.setMouth(nose, mBias, m0, m1);
        // UPDATE NOSE
        var nBias = weridFace.getBias(per, 1);
        nose.position.y = 0.2 + -0.1 + 0.2 * nBias;
        nose.rotation.y = 1 - 1.2 * nBias;
        // step frame
        frame += 1;
        frame %= frameMax;
    };
    //******** **********
    // USING DAE TOOLS TO LOAD THE *.dae FILE CONTENTS
    //******** **********
    var daeObjects = DAE.create({
        onItemProgress: function(per, n, d){
            console.log('progress: ' + per.toFixed(2) + ' ( ' + n + '/' + d + ' )');
        },
        onFileLoad: function(result, allResults, daeObjects){
            console.log('fileLoad');
        },
        onLoad: function(daeObjects, results){
            results.forEach(function(result){
                var rScene = result.scene;
                // nose object?
                if(rScene.getObjectByName('nose')){
                    nose = rScene.getObjectByName('nose');
                    scene.add(nose);
                }
                // mouth object?s
                if(rScene.getObjectByName('mouth-0')){
                    m0 = rScene.getObjectByName('mouth-0');
                    m1 = rScene.getObjectByName('mouth-1');
                }
            });
            loop();
        }
    });
    // load dae files
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae/weird-face-1',
        relUrls: ['weird-face-1c.dae', 'mouths-1c.dae']
    });
}());
