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

    // GUY1
    var guy1 = GuyMod.create();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);
    scene.add(guy1.group);
    
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

            // GUY1
            guy1.head.rotation.y = 0;
            guy1.head.scale.set(1, 1, 1);
            guy1.head.position.x = 0;
            guy1.arm_left.rotation.z = 0;
            guy1.arm_right.rotation.z = 0;
            guy1.body.rotation.y = 0;
            BetaWorld.positionObject(world, guy1.group, 0, 0, 1.55);

            // CAMERA
            var camLat = 0.14 - 0.07 * seq.per,
            camLong = 0.15,
            camAlt = 10 - 5 * seq.per;
            BetaWorld.positionObject(world, camera, camLat, camLong, camAlt);
            camera.lookAt(guy1.group.position);

            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
