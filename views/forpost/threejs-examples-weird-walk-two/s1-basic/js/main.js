(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
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
    var width = 20, height = 100;
    var size = width * height;
    var data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        var stride = i * 4;
        var x = i % width;
        var y = Math.floor(i / width);
        //var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        var v = y % 2 === 0 ? 255 - 200 * (x / width) : 55 + 200 * (x / width);
        data[ stride ] = 0;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = 0;
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
    var guy = weirdGuy2.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy2.setWalk(guy, 0);
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
            weirdGuy2.setWalk(guy, v.bias);

            // setting arms
            var v1 = getFrameValues(frame, maxFrame, 10);
            var v2 = getFrameValues(frame, maxFrame, 80);
            var a2 = 360 - (80 + 20 * v2.bias);
            weirdGuy2.setArm(guy, 1, 185 - 10 * v1.bias, a2 );
            weirdGuy2.setArm(guy, 2, 175 + 10 * v1.bias, a2 );

            // body rotation
            var v = getFrameValues(frame, maxFrame, 1);
            var body = guy.getObjectByName(guy.name + '_body');
            body.rotation.y = -0.5 + 1 * v.bias;

            //var v = getFrameValues(frame, maxFrame, 40);
            //weirdGuy2.setArm(guy, 1, 180 - 90 * v.bias, 300 );
            //weirdGuy2.setArm(guy, 2, 90 + 90 * v.bias, 300 );

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
