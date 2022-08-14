(function () {

    // SCENE
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

    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);

    // CONTROL
    var controls = new THREE.OrbitControls(camera, renderer.domElement);


var lerpGeo = function(geo, geoA, geoB, alpha){
    alpha = alpha || 0;
    // pos, and new pos
    let pos = geo.getAttribute('position');
    let norm = geo.getAttribute('normal');
    // positions for a and b
    let posA = geoA.getAttribute('position');
    let posB = geoB.getAttribute('position');
    // normals for a and b
    let normA = geoA.getAttribute('normal');
    let normB = geoB.getAttribute('normal');

    var i = 0, len = pos.array.length;
    while(i < len){
        // update position
        var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
        var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
        v.lerp(v2, alpha);
        pos.array[i] = v.x;
        pos.array[i + 1] = v.y;
        pos.array[i + 2] = v.z;      
        i += 3;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    //norm.needsUpdate = true;
};


    // app loop
    var frame = 0, frameMax = 300,
    mouth, m0, m1;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;


lerpGeo(mouth.geometry, m0.geometry, m1.geometry, bias);

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


console.log(m1);

            // mouth is based off of m0
            mouth = new THREE.Mesh(m0.geometry.clone(), m0.material )
            scene.add(mouth);
            // start loop
            loop();
        }
    });

    DAE.loadAll(daeObjects, {
        baseUrl: '/dae/weird-face-1',
        relUrls: ['weird-face-1b.dae', 'mouths-1c.dae']
    });

}
    ());
