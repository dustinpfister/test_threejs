(function () {
    // SCENE, CAMERA, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10))
    var width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(width, height);
    // MESH
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING CAMERA POSITION ONCE HERE
    camera.position.set(0, 5, 5);
    // APP LOOP
    var secs = 0,
    fps_update = 20,
    fps_movement = 30,
    frame = 0,
    frameMax = 300,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / frameMax,
        bias = (1 - Math.abs(per - 0.5) / 0.5);
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            // CALLING THE LOOKAT METHOD OF THE CAMERA
            camera.lookAt(mesh.position);
            // MOVEING THE MESH OBJECT BUT NOT THE CAMERA
            mesh.position.x = -5 + 10 * bias
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());