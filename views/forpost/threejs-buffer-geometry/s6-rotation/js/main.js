(function () {
    //******** **********
    // SCENE, CAMERA, RENDER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(6, 8, 6);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // MESH OBJECTS
    //******** **********
    var mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 2, 30, 30),
        new THREE.MeshNormalMaterial()
    );
    mesh1.position.set(-1.5, 0, 0);
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 2, 30, 30),
        new THREE.MeshNormalMaterial()
    );
    mesh2.position.set(1.5, 0, 0);
    scene.add(mesh2);
    // CHILD MESH OBEJECTS
    var childMaterial = new THREE.MeshNormalMaterial({ 
        transparent: true,
        opacity: 0.5
    });
    mesh1.add( new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        childMaterial) );
    mesh2.add( new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        childMaterial) );
    //******** **********
    // LOOP
    //******** **********
    var frame = 0,
    maxFrame = 200,
    fps_target = 24,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;
        requestAnimationFrame(loop);
        if (secs >= 1 / fps_target) {
            // ROTATION OF GEOMETRY COMPARED TO MESH
            var rx = Math.PI * 2 * per,
            rz = Math.PI * 8 * per;
            // USING COPY AND ROTATION METHODS
            mesh1.geometry.copy( new THREE.ConeGeometry(0.25, 2, 30, 30) );
            mesh1.geometry.rotateX( rx );
            mesh1.geometry.rotateZ( rz );
            // USING OBJECT3D ROTATION PROPERTY OF MESH2 to ROTATE THE MESH OBJECT
            // RATHER THAN THE GEOMETRY
            mesh2.rotation.set(rx ,0, rz)
            // render, step frame, ect...
            renderer.render(scene, camera);
            frame += 1;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());