(function () {



    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#00afaf');
    scene.add(new THREE.GridHelper(7, 7));


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

    var light = new THREE.PointLight(0xffffff);
    light.position.set(10, 10, 20);
    scene.add(light);

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
        frame: 0, //202,
        canvas: renderer.domElement,
        sequence: []
    };

    // sequence 1 zooming in to guy 2
    video.sequence.push({
        maxFrame: Math.ceil(30 * 2),
        forFrame: function (seq) {

            // GUY2
            guy2.head.rotation.y = 0;

            // CAMERA
            var x = 10 - 10 * seq.per,
            y = 10 - 5 * seq.per,
            z = 10 - 5 * seq.per;
            camera.position.set(x, y, z);
            camera.lookAt(guy2.group.position);


            renderer.render(scene, camera);
        }
    });

    // sequence 2 - guy2 rotates head to face guy1
    video.sequence.push({
        maxFrame: Math.ceil(30 * 2),
        forFrame: function (seq) {

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90 * seq.per * -1;

            // CAMERA
            camera.position.set(0, 5, 5);
            camera.lookAt(guy2.group.position);

            renderer.render(scene, camera);
        }
    });

    // sequence 2.1 - guy2 asks if guy1 is okay
    video.sequence.push({
        maxFrame: Math.ceil(30 * 2),
        forFrame: function (seq) {

            // GUY2
            guy2.head.rotation.y = Math.PI / 180 * 90;

            // CAMERA
            camera.position.set(0, 5, 5);
            camera.lookAt(guy2.group.position);

            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
