(function () {
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    // SCENE, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
    // LOOP
    var state = {
        frame: 0,
        maxFrame: 90,
        fps: 30,
        lt: new Date()
    };
    var loop = function(){
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        var per = state.frame / state.maxFrame;
        var bias = 1 - Math.abs(per - 0.5) / 0.5;
        requestAnimationFrame(loop);
        if(secs > 1 / state.fps){
            // ZOOM
            camera.zoom = 0.05 + 20.95 * bias;
            camera.updateProjectionMatrix();
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            renderer.render(scene, camera);
            state.lt = new Date();
        }
    };
    loop();

}
    ());