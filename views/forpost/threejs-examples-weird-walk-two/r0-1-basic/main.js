(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 1.5, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    //-------- ----------
    // HELPER METHODS
    //-------- ----------
    // give frame, maxframe, and count to get values like per, bias, ect
    const getFrameValues = function(frame, maxFrame, count){
        count = count === undefined ? 1 : count;
        const values = {
            frame: frame, 
            maxFrame: maxFrame
        };
        values.per = frame / maxFrame * count % 1;
        values.bias = 1 - Math.abs(0.5 - values.per) / 0.5;
        return values;
    };
    //-------- ----------
    // GROUND MESH
    //-------- ----------
    const texture = datatex.forEachPix(20, 100, function(x, y, w, h, i){
        const obj = {};
        const v = y % 2 === 0 ? 255 - 200 * (x / w) : 55 + 200 * (x / w);
        obj.r = v;
        obj.b = v;
        return obj;
    });
    const ground = new THREE.Mesh( new THREE.BoxGeometry(20, 1, 100), new THREE.MeshStandardMaterial({
        map: texture
    }) );
    ground.position.y = -1.0;
    scene.add(ground);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy2.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy2.setWalk(guy, 0);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let frame = 0, lt = new Date();
    const maxFrame = 300;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // update guy position over mesh
            let v = getFrameValues(frame, maxFrame, 1);
            guy.position.z = -10 + 20 * v.per;
            // set walk
            v = getFrameValues(frame, maxFrame, 40);
            weirdGuy2.setWalk(guy, v.bias);
            // setting arms
            const v1 = getFrameValues(frame, maxFrame, 10);
            const v2 = getFrameValues(frame, maxFrame, 80);
            const a2 = 360 - (80 + 20 * v2.bias);
            weirdGuy2.setArm(guy, 1, 185 - 10 * v1.bias, a2 );
            weirdGuy2.setArm(guy, 2, 175 + 10 * v1.bias, a2 );
            // body rotation
            v = getFrameValues(frame, maxFrame, 1);
            const body = guy.getObjectByName(guy.name + '_body');
            body.rotation.y = -0.5 + 1 * v.bias;
            // update camera
            v = getFrameValues(frame, maxFrame, 1);
            camera.position.copy(guy.position).add(new THREE.Vector3(5, 3, 5));
            const a = new THREE.Vector3(0, 0, 0);
            guy.getWorldPosition(a);
            camera.lookAt(a.add(new THREE.Vector3( 0, -1.0, 2.0)));
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
