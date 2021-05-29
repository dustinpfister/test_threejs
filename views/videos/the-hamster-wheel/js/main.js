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

    var forFrame1 = function(seq){
        var per = seq.per;

        console.log(seq.secs, '/', seq.secsTotal);

        // move wheel
        var r = -Math.PI * 8 * per;
        wheel.wheel.rotation.z = r;

        // update guy
        GuyMod.walk(guy, per * 8);
        var bias = Math.abs(0.5 - (per * 8 % 1)) / 0.5;
        GuyMod.moveHead(guy, 0.8 + 0.2 * bias);
        guy.group.position.y = 0.125 * bias;

        // move camera
        var a = 7 - 5 * per;
        camera.position.set(a, a, a - 3 * per);
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    };

    // load VIDEO UI Object
    videoUI.load({
        frame: 0,
        canvas: renderer.domElement,
        sequence: [
            {
                maxFrame: 30,
                forFrame: forFrame1
            },
            {
                maxFrame: 120,
                forFrame: forFrame1
            }
        ]
    });

}
    ());
