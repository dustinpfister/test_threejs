
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
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // can set an on onProgress, and onLoad callbacks 
    // when creating daeObjects state object
    var daeObjects = DAE.create({
        onProgress: function(){
        },
        onLoad: function(){
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
        ],
        onFileLoad: function(deaObjects){
            console.log('for each dea file');
        },
        onLoad: function(daeObjects){
            console.log('files loaded');
        }
    }).then(function(deaObjects){
        console.log('A promise can be used');
    }).catch(function(e){
        console.log(e);
    });


}
    ());
