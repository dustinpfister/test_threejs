(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(6, 6));
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // POINT LIGHT
    // ---------- ----------
    var light = new THREE.PointLight(0xffffff, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x2a2a2a, 0.3));
    // ---------- ----------
    // ADDING A FEW MESH OBJECTS TO THE SCENE
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.PlaneGeometry(5,5),
            new THREE.MeshPhongMaterial( { color: new THREE.Color('cyan') } )
    );
    mesh1.rotation.x = -1.57;
    scene.add(mesh1);
    // ---------- ----------
    // CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
    // ---------- ----------
    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 30, // fps rate to move camera
    frame = 0,
    frameMax = 120,
    lt = new Date();
    // update
    var update = function(){
        var per = Math.round(frame) / frameMax,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        light.position.set(-2 + 4 * bias, 2, 0);
    };
    // loop
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            update();
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());