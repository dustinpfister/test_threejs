
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var lt = new Date(),
    layerModes = [[0], [1], [0, 1]],
    layerModeIndex = 0;

    var setToLayerMode = function(obj, index){
		
		
	};

    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 3) {
            renderer.render(scene, camera);
            lt = now;
        }
    };
    renderer.render(scene, camera);
    loop();

}
    ());
