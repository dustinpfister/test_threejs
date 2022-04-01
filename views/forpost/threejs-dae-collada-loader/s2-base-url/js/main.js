
(function () {
    // SCENE, CAMERA, RENDERER, and LIGHT SOURCE
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
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
	scene.add(pl);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // APP LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        controls.update();
    };
 
    // CREATE A COLLADALOADER INSTANCE
    var loader = new THREE.ColladaLoader();
    // SETTING THE BASE RESOURCE URL FOR TEXTTURES
    loader.setResourcePath('/dae/guy2/guy2-skin-mrg1/');
    // CALL THE LOAD METHOD, PASS THE ABSOLUTE OR RELATIVE PATH
    // TO THE *.DAE FILE AS THE FIRST ARGUMENT, AND A DONE CALLBACK
    // AS THE SECOND ARGUMENT
    loader.load('/dae/guy2/guy2.dae', function (result) {
        // adding the child that I want to the scene
        scene.add(result.scene.children[2]);
        // start the app loop
        loop();
    });

}
    ());
