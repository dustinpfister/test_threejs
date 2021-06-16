(function () {

    var texture = canvasTextureMod.randomGrid([0, 'r1', 0], 128);
    var MATERIAL_WORLD = new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            map: texture
        });

    var MATERIAL_TREE = MATERIAL_WORLD;

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#00afaf');

    // WORLD
    var world = BetaWorld.create();
    world.userData.worldSphere.material = MATERIAL_WORLD;
    scene.add(world);

    // GUY
    var guy1 = GuyMod.create();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    var guy1_wrap = BetaWorld.createObjectWrapper(world, guy1.group);
    BetaWorld.positionObject(world, guy1_wrap, 0.05, 0.02, 1.55);
    guy1_wrap.lookAt(world.position);
    scene.add(guy1_wrap);
    
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
        frame: 0, // 1470 - sq10
        canvas: renderer.domElement,
        sequence: []
    };

    // sequence 0 zooming in to guy 2
    video.sequence.push({
        maxFrame: Math.ceil(30 * 2),
        forFrame: function (seq) {

            // GUY2
            BetaWorld.positionObject(world, guy1_wrap, 0, 0, 1.55);

            // CAMERA
            var camLat = 0.14 - 0.07 * seq.per,
            camLong = 0.15,
            camAlt = 10 - 5 * seq.per;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1_wrap.position);

            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
