(function () {

    // SCENE
    var scene = new THREE.Scene();

    // WHEEL
    var wheel = WheelMod.create(); //new HamsterWheel();
    wheel.group.position.set(0, 0, 1);
    scene.add(wheel.group);

    // GUY
    var guy = GuyMod.create(); //new Guy();
    guy.group.scale.set(0.5, 0.5, 0.5);
    guy.group.position.set(0,  - .4, 0);
    guy.group.rotation.set(0, Math.PI / 2, 0)
    scene.add(guy.group);

    // PLANE
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 30, 8, 8),
            new THREE.MeshBasicMaterial({
                color: 0x4a4a4a
            }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.9;
    scene.add(plane);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, 0.05, 100);
    camera.add(new THREE.PointLight());
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var video = {
        frame: 0,
        canvas: renderer.domElement,
        sequence: []
    };

    // guy is looping around in the wheel that is not in motion
    video.sequence.push({
        maxFrame: 90,
        forFrame: function (seq) {
            var per = seq.per;

            // move wheel
            wheel.group.position.set(1, 0, 0);
            wheel.group.rotation.y = 1.57;
            wheel.wheel.rotation.z = 0;

            // update guy
            var walksPerSecond = 4;
            GuyMod.walk(guy, per * seq.secsTotal * walksPerSecond % 1);
            var bias = Math.abs(0.5 - (per * seq.secsTotal * 4 % 1)) / 0.5;
            GuyMod.moveHead(guy, 0.8 + 0.2 * bias);
            //guy.group.position.y = 0.125 * bias;
            guy.group.rotation.set(0, 0, 0);
            var rotationsPerSecond = 1;
            guy.group.rotation.x = Math.PI * 2 * (per * seq.secsTotal * rotationsPerSecond % 1) * -1;

            // move camera
            //var a = 7 - 5 * per;
            camera.position.set(-5, 5, 5);
            camera.lookAt(-1, 0, 1);

            renderer.render(scene, camera);
        }
    });

    // move camera in on guy walking and moving head
    video.sequence.push({
        maxFrame: 150,
        forFrame: function (seq) {
            var per = seq.per;

            // move wheel
            wheel.group.position.set(1, 0, 0);
            wheel.group.rotation.y = 1.57;
            var r = -Math.PI * seq.secsTotal * seq.per;
            wheel.wheel.rotation.z = r;

            // update guy
            GuyMod.walk(guy, per * seq.secsTotal * 2 % 1);
            var bias = Math.abs(0.5 - (per * seq.secsTotal * 4 % 1)) / 0.5;
            GuyMod.moveHead(guy, 0.8 + 0.2 * bias);
            guy.group.rotation.set(0, 0, 0);
            guy.group.position.y = 0.125 * bias;

            // move camera
            var a = 7 - 5 * per;
            camera.position.set(a, a, a - 3 * per);
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }
    });

    // camera is fixed and guy is just jumping up and down, with head spinning around in circles
    video.sequence.push({
        maxFrame: 150,
        forFrame: function (seq) {
            var per = seq.per;

            // wheel
            wheel.group.position.set(1, 0, 0);
            wheel.group.rotation.y = 1.57;
            var r = -Math.PI * seq.secsTotal * seq.per;
            wheel.wheel.rotation.z = r;

            // update guy
            GuyMod.walk(guy, 0.25);
            var bias = Math.abs(0.5 - (per * seq.secsTotal * 4 % 1)) / 0.5;
            GuyMod.moveHead(guy, 8 * seq.per);
            guy.group.rotation.set(0, 0, 0);
            guy.group.position.y = 0.125 * bias;

            // camera
            camera.position.set(5, 5, -5);
            camera.lookAt(1, 0, -1);

            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
