(function () {
    // ********** **********
    // SCENE, CAMERA, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    var renderer = new THREE.WebGLRenderer();
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // WEIRD GUY MODULE
    // ********** **********

    var weirdGuy = (function(){

        var api = {};

        // create a new weird guy
        api.create = function(opt){
            opt = opt || {};
            var guy = new THREE.Group();
            guy.name = opt.guyID || 'guy';
            var materials = [
                new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } ),
                new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } )
            ];
            // body mesh
            var body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1.5, 1),
                materials[0]
            );
            body.name = guy.name + '_body';
            guy.add(body);
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
                    materials[0]
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

        };

        // return the api
        return api;

    }());

    var guy = weirdGuy.create({
        guyID: 'mrguy1'
    });
    scene.add(guy);

    weirdGuy.setWalk(guy, 0);

    // ********** **********
    // ANIMATION LOOP
    // ********** **********
	
            renderer.render(scene, camera);
	/*
    var frame = 0,
    maxFrame = 200,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 0.05) {
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = Math.PI * 2 * per;
            // draw
            renderer.render(scene, camera);
            frame += 30 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
	*/

}
    ());
