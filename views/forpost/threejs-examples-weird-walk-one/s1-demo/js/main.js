(function () {
    // ********** **********
    // SCENE, CAMERA, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    var renderer = new THREE.WebGLRenderer();
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // ADDING OBJECTS
    // ********** **********

    var guy = new THREE.Group();
    var materials = [
       new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } ),
       new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } )
    ];
    scene.add(guy);
    // body mesh
    var body = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1.5, 1),
        materials[0]
    );
    guy.add(body);
    
    // ADD PELVIS
    var pelvis = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.5, 1),
        materials[1]
    );
    pelvis.position.set(0, -1.0, 0);
    guy.add(pelvis);

    // ADD LEGS
    ['leg1', 'leg2'].forEach(function(nameStr, i){
        var leg = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 1.5, 1),
            materials[0]
        );
        leg.position.set(-0.25 + 0.5 * i, -1, 0);
        pelvis.add(leg);
    });

    

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
