(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    //scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 1.5, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // HELPER METHODS
    // ********** **********
    // give frame, maxframe, and count to get values like per, bias, ect
    var getFrameValues = function(frame, maxFrame, count){
        count = count === undefined ? 1 : count;
        var values = {
            frame: frame, 
            maxFrame: maxFrame
        };
        values.per = frame / maxFrame * count % 1;
        values.bias = 1 - Math.abs(0.5 - values.per) / 0.5;
        return values;
    };
    // ********** **********
    // GROUND MESH
    // ********** **********
    var width = 10, height = 50;
    var size = width * height;
    var data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        var stride = i * 4;
        var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    var texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;

    var ground = new THREE.Mesh( new THREE.BoxGeometry(20, 1, 100), new THREE.MeshStandardMaterial({
        map: texture
    }) );
    ground.position.y = -0.5;
    scene.add(ground);
    // ********** **********
    // WEIRD GUY INSTANCE
    // ********** **********
    var guy = weirdGuy.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy.setWalk(guy, 0);
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 300,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {

            // update guy position over mesh
            var v = getFrameValues(frame, maxFrame, 1);
            guy.position.z = -10 + 20 * v.per;

            // set walk
            var v = getFrameValues(frame, maxFrame, 40);
            weirdGuy.setWalk(guy, v.bias);

            // setting arms
            var v = getFrameValues(frame, maxFrame, 20);
            weirdGuy.setArm(guy, 1, 180 - 90 * v.bias, 0);
            weirdGuy.setArm(guy, 2, 90 + 90 * v.bias, 0);

            // update camera
            var v = getFrameValues(frame, maxFrame, 1);
            camera.position.copy(guy.position).add(new THREE.Vector3(4, 2, 4));
            var a = new THREE.Vector3(0, 0, 0);
            guy.getWorldPosition(a);
            camera.lookAt(a.add(new THREE.Vector3( 1 - 2 * v.bias, -1, 0)));

            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
	

}
    ());
