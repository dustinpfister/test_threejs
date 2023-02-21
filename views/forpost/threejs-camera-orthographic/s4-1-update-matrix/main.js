(function () {
    //******** **********
    // SCENE, RENDERER, LIGHT
    //******** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.25, 0.25, 0.25);
    scene.add(new THREE.GridHelper(10,10));
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var light = new THREE.PointLight();
    light.position.set(0, 3, 6);
    scene.add(light);
    //******** **********
    // CAMERA
    //******** **********
    var width = 4.0,
    height = 4.0;
    var camera = new THREE.OrthographicCamera(
            -width,
            width,
            height,
            -height,
            0.01,
            100);
    camera.position.set(5,2,5);
    camera.lookAt(0, 0, 0);
    //******** **********
    // MESH
    //******** **********
    var material = new THREE.MeshNormalMaterial();
    var m1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), material );
    m1.position.set(0, 0.5, 0);
    scene.add( m1 );
    var m2 = new THREE.Mesh( new THREE.BoxGeometry(1,3,1), material );
    m2.position.set(-3, 1.5, 1);
    scene.add( m2 );
    var m3 = new THREE.Mesh( new THREE.BoxGeometry(1,3,1), material );
    m3.position.set(3, 1.5, -1);
    scene.add( m3 );
    //******** **********
    // lOOP
    //******** **********
    var frame = 0,
    maxFrame = 300;
    var loop = function () {
        var per = frame / maxFrame;
        requestAnimationFrame(loop);
        // SETTING LEFT, RIGHT, TOP, AND BOTTOM PROPS
        var b = 1 - Math.abs(0.5 - per) / 0.5;
        width = 4 + 4 * b;
        height = 4 - 2 * b;
        camera.left = width * -1;
        camera.right = width;
        camera.top = height;
        camera.bottom = height * -1;
        // CALLING UPDATE PROJECTION MATRIX METHOD
        camera.updateProjectionMatrix();
        // render, step
        renderer.render(scene, camera);
        frame += 1;
        frame = frame % maxFrame;
    };
    loop();
}());