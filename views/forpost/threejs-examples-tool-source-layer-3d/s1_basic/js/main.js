
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
    renderer.setSize(320, 240);
    var container = document.getElementById('demo');
    container.style.width = "320px";
    container.appendChild(renderer.domElement);

    // can set an on onProgress, and onLoad callbacks 
    // when creating daeObjects state object
    var i = 0;
    var daeObjects = DAE.create({
        onItemProgress: function(per, n, d){
            console.log('progress: ' + per.toFixed(2) + ' ( ' + n + '/' + d + ' )');
        },
        onFileLoad: function(result, allResults, daeObjects){
            console.log('fileLoad');
        },
        onLoad: function(daeObjects, results){
            results.forEach(function(result, i){
                var group = DAE.createGroup(daeObjects, result);
                group.position.z = 3 - 6 * i;
                scene.add(group);
            });
            renderer.render(scene, camera);
        }
    });

    // load all should work like this
    // when doing so the onLoad method
    // will be called after any additional 
    // callbacks used here
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae',
        relUrls: [
            'rpi4/rpi4_start_box.dae',
            'obj/obj.dae'
        ]
    });


}
    ());
