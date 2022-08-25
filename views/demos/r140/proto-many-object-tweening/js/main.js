
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
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

    // load dae, start loop
    var loader = new THREE.ColladaLoader();
    loader.load("/dae/many-object-tweening/many-object-tweening-1a.dae", function (result) {
        [ 'box-1', 'box-2', 'box-3' ].forEach(function(objName, i, arr){
            var sourceObj = result.scene.getObjectByName(objName);
            sourceObj.position.set(-3 + 6 * ( i / ( arr.length - 1) ), 0, 0);
            scene.add(sourceObj);
        });
        loop();
    });

}
    ());
