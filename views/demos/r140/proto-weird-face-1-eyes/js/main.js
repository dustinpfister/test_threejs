(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(2, 1, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
    // CONTROL
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // APP LOOP
    var frame = 0, frameMax = 300,
    nose, m0, m1;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax;
        // UPDATE MOUTH
        var mBias = 1 - Math.abs( ( per * 8 % 1 ) - 0.5) / 0.5;
        weridFace.setMouth(nose, mBias, m0, m1);
        // step frame
        frame += 1;
        frame %= frameMax;
    };
    // USING DAE TOOLS TO LOAD THE *.dae FILE CONTENTS
    var daeObjects = DAE.create({
        onItemProgress: function(per, n, d){
            console.log('progress: ' + per.toFixed(2) + ' ( ' + n + '/' + d + ' )');
        },
        onFileLoad: function(result, allResults, daeObjects){
            console.log('fileLoad');
        },
        onLoad: function(daeObjects, results){
            // main nose object of werid face
            var rScene = daeObjects.results[0].scene;
            nose = rScene.getObjectByName('nose');

// playing with pupil1
var eye1 = nose.getObjectByName('eye1');
var pupil1 = nose.getObjectByName('pupil1');
console.log(eye1);

var radius = 0.2;

// using set and apply euler
pupil1.position.set(0 , radius * -1, 0).applyEuler( new THREE.Euler(0.25,0,0.75) );
var v = new THREE.Vector3();
eye1.getWorldPosition( v );
pupil1.lookAt( v );

            scene.add(nose);
            // mouth objects
            rScene = daeObjects.results[1].scene;
            m0 = rScene.getObjectByName('mouth-0');
            m1 = rScene.getObjectByName('mouth-1');
            loop();
        }
    });
    // load dae files
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae/weird-face-1',
        relUrls: ['weird-face-1c.dae', 'mouths-1c.dae']
    });
}
    ());
