(function () {

    // SCENE
    var scene = new THREE.Scene();

    // GROUND
    var ground = TileMod.create({
            w: 100,
            h: 100,
            sw: 32,
            sh: 32
        });
    TileMod.setCheckerBoard(ground);
    scene.add(ground);

    // GUY
    var guy = GuyMod.create();
    guy.group.position.set(0, 3, 0);
    scene.add(guy.group);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 100);
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

    // first sequence
    video.sequence.push({
        maxFrame: 30,
        forFrame: function (seq) {
            camera.position.set(10, 8, 10);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
