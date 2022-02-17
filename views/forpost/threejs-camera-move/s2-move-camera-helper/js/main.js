(function () {

    // create camera helper
    var createCamera = function(opt){
        opt = opt || {};
        var width = 640, height = 480,
        fieldOfView = 40, aspectRatio = width / height,
        near = 0.1, far = 1000,
        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
        camera.userData.subject = new THREE.Vector3();
        return camera;
    };

    // follow subject1 method
    var followSubject1 = function(camera, per){
        var bias = 1 - Math.abs(per - 0.5) / 0.5;
        return {
            position: new THREE.Vector3(-8, 5, -8 + 16 * bias), 
            lookAt: camera.userData.subject
        };
    };

    // follow subject2 method
    var followSubject2 = function(camera, per){
        var rad = Math.PI * 2 * per,
        x = Math.cos(rad) * 6,
        y = -4 + 8 * (1 - Math.abs(per - 0.5) / 0.5),
        z = Math.sin(rad) * 6;
        return {
            position: new THREE.Vector3(x, y, z), 
            lookAt: camera.userData.subject
        };
    };

    // move camera update helper
    var moveCamera = function (camera, per, moveFunc) {
        var camState = moveFunc(camera, per);
        // position property can be used to set
        // the position of a camera
        camera.position.copy(camState.position)
        // the rotation property or the lookAt method
        // can be used to set rotation
        camera.lookAt(camState.lookAt);
    };

    // CAMERA
    var camera = createCamera();

    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8))
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    mesh.position.set(3, 0, 0);
    scene.add(mesh);

    camera.userData.subject = mesh.position;

    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but chopy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = Math.round(frame) / frameMax,
        bias = (1 - Math.abs(per - 0.5) / 0.5);
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            // calling camera update method
            moveCamera(camera, per, followSubject1);
            // moving mesh
            mesh.position.x = -2 + 4 * bias;
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());