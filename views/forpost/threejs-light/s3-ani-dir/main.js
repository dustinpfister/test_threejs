(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(6, 6));
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING DIRECTIONAL AND AMBIENT LIGHT TO THE SCENE
    // ---------- ----------
    var light = new THREE.DirectionalLight(0x2a2a2a, 2.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x2a2a2a, 0.25));
    // ---------- ----------
    // ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.75),
            new THREE.MeshPhongMaterial( { color: new THREE.Color('red') } )
    );
    scene.add(mesh1);
    // ---------- ----------
    // CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
    // ---------- ----------
    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    // update
    var update = function(){
        var per = Math.round(frame) / frameMax,
        radian = Math.PI * 2 * per,
        x = Math.cos(radian) * 25, 
        y = 0,
        z = Math.sin(radian) * 25;
        light.position.set(x, y, z);
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