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
    // CAN ROTATE guy1.group THREE.Group INSTANCE INDEPENDANT OF AN OBJECT WRAP
    guy1.group.lookAt(0, 1.55, 0);
    guy1.group.rotateY(Math.PI * 0.5);
    // CREATING AND ADDING A WRAP FOR GUY1
    var guy1_wrap = BetaWorld.createObjectWrapper(world, guy1.group);
    BetaWorld.positionObject(world, guy1_wrap, 0.05, 0.02, 1.55);
    // CAN ROTATE THE WRAP THREE.Group RATHER THAN guy1.group
    guy1_wrap.lookAt(world.position);
    scene.add(guy1_wrap);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
    scene.add(camera);
    BetaWorld.positionObject(world, camera, 0.15, 0.5, 7.5);
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

            // GUY1
            var latPer = 0.125;
            var longPer = 0.01 + 0.98 * seq.per;
            // POSITIONING THE WRAP GROUP SO THAT IT ALWAYS FACES TO THE GROUND
            BetaWorld.positionObject(world, guy1_wrap, latPer, longPer, 1.5);
            guy1_wrap.lookAt(world.position);

            // I CAN THEN ALSO ADJUST THE ROTATION OF THE INNER GROUP
            // INDEPENDENTLY FROM THE OUTER WRAP GROUP
            guy1.group.rotation.y = Math.PI * 4 * seq.bias;

            // MAKE SURE THAT WHEN USING LOOK AT, LOOK AT THE WRAP
            // IF YOU WANT TO LOOK AT THE guy1.group IT WILL BE CALLED FOR
            // TO GET THE WORLD RELATIVE POSTION OF THAT GROUP
            camera.lookAt(guy1_wrap.position);
            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
