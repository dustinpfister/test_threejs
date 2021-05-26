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

    // Plane
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 30, 8, 8),
            new THREE.MeshBasicMaterial({
                color: 0x4a4a4a
            }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.9;
    scene.add(plane);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    camera.position.set(5, 6, 5);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    // load VIDEO UI Object
    videoUI.load({
        frame: 0,
        maxFrame: 300,
        canvas: renderer.domElement,
        forFrame: function(frame, maxFrame){
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = -Math.PI * 4 * per;
            wheel.wheel.rotation.z = r;
            GuyMod.walk(guy, per * 8);
            GuyMod.moveHead(guy, 0.8 + 0.2 * bias);
            renderer.render(scene, camera);
        }
    });

}
    ());
