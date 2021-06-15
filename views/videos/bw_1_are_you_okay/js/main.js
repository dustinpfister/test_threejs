(function () {



    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#00afaf');
    //scene.add(new THREE.GridHelper(7, 7));

    // WORLD
    var world = BetaWorld.create();
    //world.position.set(0, -30, 0);
    scene.add(world);

    // GUY1
    var guy1 = GuyMod.create();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    guy1.group.position.set(-2, 1.55, 0);
    guy1.group.lookAt(-2, 1.55, 1);
    scene.add(guy1.group);

    // GUY2
    var guy2 = GuyMod.create();
    guy2.group.scale.set(0.5, 0.5, 0.5);
    guy2.group.position.set(2, 1.55, 0);
    guy2.group.lookAt(2, 1.55, 1);
    scene.add(guy2.group);

    // LIGHT
/*
    var light_sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30));
    light_sphere.position.set(0, 10, -5);
    var light = new THREE.PointLight(0xffffff, 1);
    light_sphere.add(light);
    scene.add(light_sphere);
    var light_ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(light_ambient);
*/

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var video = {
        frame: 570, 
        canvas: renderer.domElement,
        sequence: []
    };

    // sequence 0 zooming in to guy 2
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = 0;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            //guy1.group.position.set(0, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = 0;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
/*
            var x = 10 - 10 * seq.per,
            y = 10 - 5 * seq.per,
            z = 10 - 5 * seq.per;
            camera.position.set(x, y, z);
*/

            var camLat = 0.14 - 0.07 * seq.per,
            camLong = 0.15,
            camAlt = 10 - 5 * seq.per;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy2.group.position);


            renderer.render(scene, camera);
        }
    });

    // sequence 1 - guy2 rotates head to face guy1
    video.sequence.push({
        maxFrame: Math.ceil(30 * 3),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = 0;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * seq.per * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(0, 5, 5);
            //camera.lookAt(guy2.group.position);

            var camLat = 0.07,
            camLong = 0.15,
            camAlt = 5;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy2.group.position);

            renderer.render(scene, camera);
        }
    });

    // sequence 2 - guy2 asks if guy1 is okay
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = 0;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(0, 5, 5);
            //camera.lookAt(guy2.group.position);

            var camLat = 0.07,
            camLong = 0.15,
            camAlt = 5;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy2.group.position);


            renderer.render(scene, camera);
        }
    });

    // sequence 3 - quick camera move to guy1
    video.sequence.push({
        maxFrame: Math.ceil(30 * 1),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = 0;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(0, 5, 5);
            //var v = new THREE.Vector3()
            //v.copy(guy2.group.position);
            //v.x = guy2.group.position.x - 4 * seq.per
            //camera.lookAt(guy1.group.position);

            var camLat = 0.07,
            camLong = 0.15,
            camAlt = 5;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);

            var v = guy2.group.position.clone(),
            d = guy2.group.position.distanceTo(guy1.group.position);

            v.x = guy2.group.position.x - d * seq.per;
            v.y = guy2.group.position.y + 0.2 * seq.per;
            
            //console.log(v);
            //console.log(guy1.group.position)

            camera.lookAt(v);

            renderer.render(scene, camera);
        }
    });

    // sequence 4 - guy1 rotates head to face guy2
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = Math.PI / 180 * 90 * seq.per;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            var camLat = 0.07,
            camLong = 0.15,
            camAlt = 5;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);

            renderer.render(scene, camera);
        }
    });

    // sequence 5 - the depth of the head of guy1 gets longer
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = Math.PI / 180 * 90;
            guy1.head.scale.set(1, 1, 1 + 5 * seq.per);
            guy1.head.position.x = ( 6 / 2 - 0.5) * seq.per;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
/*
            var x = 5 * seq.per,
            y = 5,
            z = 5 - 5 * seq.per;
            camera.position.set(x, 5, z);
            camera.lookAt(guy1.group.position);
*/
            var camLat = 0.07 + 0.02 * seq.per,
            camLong = 0.15 - 0.15 * seq.per,
            camAlt = 5 + 1 * seq.per;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);

            renderer.render(scene, camera);
        }
    });

    // sequence 6 - guy1 responds with 'no'
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = Math.PI / 180 * 90;
            guy1.head.scale.set(1, 1, 1 + 5);
            guy1.head.position.x = ( 6 / 2 - 0.5);
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(5, 5, 0);
            //camera.lookAt(guy1.group.position);

            var camLat = 0.09,
            camLong = 0,
            camAlt = 6;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);

            renderer.render(scene, camera);
        }
    });

    // sequence 7 - guy1 head depth returns to 1
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = Math.PI / 180 * 90;
            guy1.head.scale.set(1, 1, 6 - 5 * seq.per);
            guy1.head.position.x = 2.5 - 2.5 * seq.per;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(5, 5, 0);
            //camera.lookAt(guy1.group.position);
            var camLat = 0.09,
            camLong = 0,
            camAlt = 6;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);


            renderer.render(scene, camera);
        }
    });

    // sequence 8 - guy1 extends arms out into t-pose
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = Math.PI / 180 * 90;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_left.rotation.z = Math.PI * 0.5 * -1 * seq.per;
            guy1.arm_right.rotation.z = Math.PI * 0.5 * seq.per;
            guy1.body.rotation.y = Math.PI * 0.5 * seq.per;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(5, 5, 0);
            //camera.lookAt(guy1.group.position);
            var camLat = 0.09,
            camLong = 0,
            camAlt = 6;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);


            renderer.render(scene, camera);
        }
    });

    // sequence 9 - guy1 starts to spin body but not head and legs
    video.sequence.push({
        maxFrame: Math.ceil(30 * 10),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = Math.PI / 180 * 90;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_left.rotation.z = Math.PI * 0.5 * -1;
            guy1.arm_right.rotation.z = Math.PI * 0.5;
            var a = Math.pow(seq.per * 4, 2);
            guy1.body.rotation.y = Math.PI * 0.5 + Math.PI * 2 * a;
            //guy1.group.position.set(-2, 1.55, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(5, 5, 0);
            //camera.lookAt(guy1.group.position);
            var camLat = 0.09,
            camLong = 0,
            camAlt = 6;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);

            renderer.render(scene, camera);
        }
    });

   // sequence 10 - guy1 starts to lift off
    video.sequence.push({
        maxFrame: Math.ceil(30 * 20),
        forFrame: function (seq) {

            // GUY1
            guy1.head.rotation.y = Math.PI / 180 * 90;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_left.rotation.z = Math.PI * 0.5 * -1;
            guy1.arm_right.rotation.z = Math.PI * 0.5;
            var a = (seq.secsTotal / 10 * 16) * seq.secs;
            guy1.body.rotation.y = Math.PI * 0.5 + Math.PI * 2 * a;

//            guy1.group.position.set(-2, 1.55 + 8 * seq.per, 0);
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55 + 8 * seq.per);

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * -1;
            BetaWorld.positionObject(world, guy2.group, 0.05, 0, 1.55);

            // CAMERA
            //camera.position.set(5 + 10 * seq.per, 5 - 10 * seq.per, 60 * seq.per);
            //camera.lookAt(guy1.group.position);
            var camLat = 0.09,
            camLong = 0,
            camAlt = 6;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);


            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
