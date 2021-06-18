(function () {

    var texture = canvasTextureMod.randomGrid([0, 'r1', 0], 128);
    var MATERIAL_WORLD = new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            map: texture
        });

    var texture = canvasTextureMod.randomGrid(['r1', 'r1', 0], 32, 200, 255);
    var MATERIAL_COW = {
            body: new THREE.MeshStandardMaterial({
                color: new THREE.Color(1, 1, 0),
                map: texture
            }),
            eyes: new THREE.MeshStandardMaterial({
                color: new THREE.Color(1, 1, 1)
            })
     };



    // scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#00afaf');

    // world
    var world = BetaWorld.create();
    world.userData.worldSphere.material = MATERIAL_WORLD;
    scene.add(world);

    // COW
    var cow = CowMod.create({materials: MATERIAL_COW});
    cow.scale.set(0.5, 0.5, 0.5);
    var cow_wrap = BetaWorld.createObjectWrapper(world, cow);
    BetaWorld.positionObject(world, cow_wrap, 0, 0, 1.5);
    scene.add(cow_wrap);

    // guy
    var guy1 = GuyMod.create();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    guy1.group.lookAt(cow_wrap.position);
    //guy1.group.rotateY(Math.PI / 180 * 0);
    var guy1_wrap = BetaWorld.createObjectWrapper(world, guy1.group);
    BetaWorld.positionObject(world, guy1_wrap, 0.10, 0.15, 1.55);
    guy1_wrap.lookAt(world.position);
    scene.add(guy1_wrap);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
    scene.add(camera);
    BetaWorld.positionObject(world, camera, 0.20, 0.95, 15);
    camera.lookAt(world.position);

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

    // sequence 0
    video.sequence.push({
        maxFrame: Math.ceil(30 * 5),
        forFrame: function (seq) {

            // camera
            var latPer = 0.18;
            var longPer = 1 * seq.per;
            BetaWorld.positionObject(world, camera, latPer, longPer, 12);
            camera.lookAt(cow_wrap.position);

            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
