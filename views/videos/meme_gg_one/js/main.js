(function () {

    var MATERIALS_CONE_TREE = new THREE.MeshStandardMaterial({
            color: '#008f00',
            emissive: '#002f00'
        });

    // SCENE
    var scene = new THREE.Scene();

    // GROUND
    var ground = TileMod.create({
            w: 80,
            h: 80,
            sw: 8,
            sh: 8
        });
    TileMod.setCheckerBoard(ground);
    TileModPositioner.processObjectIndexString(ground, {
        string: '10200102' +
        '20010000' +
        '01000010' +
        '00000000' +
        '10200001' +
        '00010000' +
        '10000000' +
        '00100002',
        forIndex: [
            // 0
            function () {},
            // 1 - tree sphere
            function (ground, x, z, tileX, tileZ, i) {
                var tree2 = TreeSphereMod.create();
                tree2.lookAt(0, -10, 0);
                tree2.scale.set(4, 4, 4);
                tree2.position.set(x, 4, z);
                scene.add(tree2);
            },
            // 2 - tree
            function (ground, x, z, tileX, tileZ, i) {
                var tree = new Tree({
                        coneMaterial: MATERIALS_CONE_TREE
                    });
                tree.group.scale.set(2, 2, 2);
                tree.group.position.set(x, 1.2, z);
                scene.add(tree.group);
            }
        ]
    });

    scene.add(ground);

    // GUY
    var guy = GuyMod.create();
    guy.group.position.set(0, 3, 0);
    scene.add(guy.group);

    /*
    // trees
    var tree = new Tree({
    coneMaterial: MATERIALS_CONE_TREE
    });
    tree.group.scale.set(2, 2, 2);
    tree.group.position.set(-13, 1.2, 0);
    scene.add(tree.group);

    var tree2 = TreeSphereMod.create();
    tree2.lookAt(0, -10, 0);
    tree2.scale.set(4, 4, 4);
    tree2.position.set(0, 4, -5);
    scene.add(tree2);
     */

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
    camera.add(new THREE.PointLight());
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var video = {
        frame: 202, //202,
        canvas: renderer.domElement,
        sequence: []
    };

    // first sequence
    video.sequence.push({
        maxFrame: Math.ceil(30 * 6.75),
        forFrame: function (seq) {
            // camera
            camera.position.set(25, 0.2 + 24.8 * seq.per, 25);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // spinning around
    video.sequence.push({
        maxFrame: Math.ceil(30 * 4.3),
        forFrame: function (seq) {
            var camPer = (seq.per * 2) % 1;
            var radian = Math.PI * 0.25 + camPer * Math.PI * 2;
            var x = Math.cos(radian) * 35,
            z = Math.sin(radian) * 35;
            camera.position.set(x, 25, z);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // back down
    video.sequence.push({
        maxFrame: 60,
        forFrame: function (seq) {
            camera.position.set(25, 25 - 24.8 * seq.per, 25);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
