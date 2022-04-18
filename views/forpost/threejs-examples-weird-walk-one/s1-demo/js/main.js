(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    //scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 1.75, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(0.1, 1.0, 0);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // WEIRD GUY MODULE
    // ********** **********

    var weirdGuy = (function(){

        var materials = [
            new THREE.MeshStandardMaterial( { emissive: 0xff0000, emissiveIntensity: 0.2, wireframe:false } ),
            new THREE.MeshStandardMaterial( { emissive: 0x0000ff, emissiveIntensity: 0.2 } ),
            new THREE.MeshStandardMaterial( { emissive: 0xffffff, emissiveIntensity: 0.2 } ),
            new THREE.MeshStandardMaterial( { emissive: 0x2a2a2a, emissiveIntensity: 0.2 } )
        ];

        var api = {};

        // create a new weird guy
        api.create = function(opt){
            opt = opt || {};
            var guy = new THREE.Group();
            guy.name = opt.guyID || 'guy';
            // BODY
            var body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1.5, 1),
                materials[0]
            );
            body.name = guy.name + '_body';
            guy.add(body);
            // EYES
            ['eye1', 'eye2'].forEach(function(nameStr, i){
                var eye = new THREE.Mesh(
                    new THREE.SphereGeometry(0.2, 30, 30),
                    materials[2]
                );
                eye.name = guy.name + '_' + nameStr;
                eye.position.set(-0.2 + 0.4 * i, 0.2, 0.5);
                var innerEye = new THREE.Mesh(
                    new THREE.SphereGeometry(0.1, 30, 30),
                    materials[3]
                );
                innerEye.position.set(0, 0, 0.125);
                eye.add(innerEye);
                body.add(eye);
            });
            // ADD MOUTH
            var mouth = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.125, 0.25),
                materials[3]
            );
            mouth.name = guy.name + '_mouth';
            mouth.position.set(0, -0.3, 0.5);
            body.add(mouth);
            // ADD ARMS
            ['arm1', 'arm2'].forEach(function(nameStr, i){
                var arm = new THREE.Mesh(
                    new THREE.BoxGeometry(0.25, 1.5, 0.25),
                    materials[0]
                );
                arm.name = guy.name + '_' + nameStr;
                arm.position.set(-0.625 + 1.25 * i, -0.5, 0);
                body.add(arm);
            });
            // ADD PELVIS
            var pelvis = new THREE.Mesh(
                new THREE.BoxGeometry(1, 0.5, 1),
                materials[1]
            );
            pelvis.name = guy.name + '_pelvis';
            pelvis.position.set(0, -1.0, 0);
            guy.add(pelvis);
            // ADD LEGS
            ['leg1', 'leg2'].forEach(function(nameStr, i){
                var leg = new THREE.Mesh(
                    new THREE.BoxGeometry(0.25, 1.5, 1),
                    materials[1]
                );
                leg.name = guy.name + '_' + nameStr;
                leg.position.set(-0.25 + 0.5 * i, -1, 0);
                pelvis.add(leg);
            });
            return guy;
        };

        // setWalk
        api.setWalk = function(guy, walkPer){
            var leg1 = guy.getObjectByName(guy.name + '_leg1'),
            leg2 = guy.getObjectByName(guy.name + '_leg2')
            // set scale of legs
            leg1.scale.y = walkPer;
            leg2.scale.y = 1 - walkPer;
            // adjust position of legs
            leg1.position.y = -1.0 + 0.75 * (1 - walkPer);
            leg2.position.y = -1.0 + 0.75 * walkPer;   
        };

        // return the api
        return api;

    }());

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
    maxFrame = 60,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 30) {
            var per = frame / maxFrame * 5 % 1,
            bias = Math.abs(0.5 - per) / 0.5;

            weirdGuy.setWalk(guy, bias);

            var per = frame / maxFrame * 1 % 1,
            bias = Math.abs(0.5 - per) / 0.5;
            guy.rotation.y = -0.5 + 2.5 * bias;

            // draw
            renderer.render(scene, camera);
            frame += 30 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
	

}
    ());
