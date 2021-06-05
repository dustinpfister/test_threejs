(function () {

    // MATERIALS FOR TREES
    var MATERIALS_CONE_TREE = new THREE.MeshStandardMaterial({
            color: '#008f00'
        });
    var MATERIALS_TREE_SPHERE = {
        sphere: new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }),
        trunk: new THREE.MeshStandardMaterial({
            color: 0xffaf00
        })
    };

    var MATERIALS_GROUND = [
        new THREE.MeshStandardMaterial({
            color: 0x00dd00,
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0x008800,
            side: THREE.DoubleSide
        })
    ];
    var MATERIALS_GROUND_DISCO = [
        new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0x888888,
            side: THREE.DoubleSide
        })
    ];

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#00afaf');

    // GROUND
    var ground = TileMod.create({
            materials: MATERIALS_GROUND,
            w: 100,
            h: 100,
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
                var tree2 = TreeSphereMod.create({
                   materials: MATERIALS_TREE_SPHERE
                });
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

    // Light
    var al = new THREE.AmbientLight(0xffffff, 0.125); // ambient light
    scene.add(al);
    var wpl = new THREE.PointLight(0xffffff, 0.75); // point light
    wpl.position.set(20, 40, 10);
    scene.add(wpl);
    // spot lights
    var sl_red = new THREE.SpotLight(0xff0000, 1, 0, Math.PI / 180 * 10, 0.25); // spot light red
    sl_red.position.set(20, 30, -20);
    scene.add(sl_red);
    var sl_green = new THREE.SpotLight(0x00ff00, 1, 0, Math.PI / 180 * 10, 0.25); // spot light green
    sl_green.position.set(0, 30, -20);
    scene.add(sl_green);
    var sl_blue = new THREE.SpotLight(0x0000ff, 1, 0, Math.PI / 180 * 10, 0.25); // spot light blue
    sl_blue.position.set(-20, 30, -20);
    scene.add(sl_blue);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
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

            // scene
            scene.background = new THREE.Color(0, 1, 1);

            // light
            wpl.intensity = 0.75;
            al.intensity = 0.125;
            sl_red.intensity = 0;
            sl_green.intensity = 0;
            sl_blue.intensity = 0;

            // guy
            guy.head.rotation.y = Math.PI * 0.25 * seq.per;
            guy.group.position.y = 3;
            GuyMod.walk(guy, 0.25 / 4, 4);

            // ground
            ground.material = MATERIALS_GROUND;

            // camera
            camera.position.set(25, 0.2 + 24.8 * seq.per, 25);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // spinning around
    video.sequence.push({
        maxFrame: 30 * 15, //Math.ceil(30 * 4.3),
        forFrame: function (seq) {

            // scene
            scene.background = new THREE.Color(0, 0, 0);

            // light
            wpl.intensity = 0;
            al.intensity = 0.075;
            sl_red.intensity = 1;
            sl_green.intensity = 1;
            sl_blue.intensity = 1;
            var radian = Math.PI * 2 * (seq.per * 8 % 1);
            sl_red.position.set(Math.cos(radian) * 20, 30, Math.sin(radian) * 20);
            sl_red.target = guy.group;
            var radian = Math.PI * 2 * (seq.per * 16 % 1);
            sl_green.position.set(Math.cos(radian) * -20, 30, Math.sin(radian) * 20);
            sl_green.target = guy.group;
            var radian = Math.PI * 2 * (seq.per * 32 % 1);
            sl_blue.position.set(Math.cos(radian) * 20, 30, Math.sin(radian) * 20);
            sl_blue.target = guy.group;

            // guy
            var bias = 1 - Math.abs((seq.per * 24 % 1) - 0.5) / 0.5;
            guy.head.rotation.y = Math.PI / 180 * 45 * (1 - 2 * bias);
            guy.group.position.y = 3 + 12 * seq.per;
            GuyMod.walk(guy, (0.25 / 8 + seq.per) % 1, 8);

            // ground
            ground.material = MATERIALS_GROUND_DISCO;

            // camera
            var camPer = (seq.per * 4) % 1;
            var radian = Math.PI * 0.25 + camPer * Math.PI * 2;
            var x = Math.cos(radian) * (35 - 30 * seq.bias),
            z = Math.sin(radian) * (35 - 30 * seq.bias);
            camera.position.set(x, 25 - 20 * seq.bias, z);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // back down
    video.sequence.push({
        maxFrame: 30 * 5,
        forFrame: function (seq) {

            // scene
            scene.background = new THREE.Color(0, seq.per, seq.per);

            // light
            wpl.intensity = 0.75 * seq.per;
            al.intensity = 0.125 * seq.per;
            sl_red.intensity = 0;
            sl_green.intensity = 0;
            sl_blue.intensity = 0;

            // guy
            guy.head.rotation.y = Math.PI * 0.25;
            guy.group.position.y = 15 - 12 * seq.per;
            GuyMod.walk(guy, 0.25 / 4, 4);

            // ground
            ground.material = MATERIALS_GROUND;

            // camera
            camera.position.set(25, 25 - 24.8 * seq.per, 25);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
