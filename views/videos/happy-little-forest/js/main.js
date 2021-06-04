(function () {

    var MATERIALS_CONE_TREE = new THREE.MeshStandardMaterial({
            color: '#008f00',
            emissive: '#002f00'
        });

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
        maxFrame: 60,
        forFrame: function (seq) {
            camera.position.set(15, 0.2 + 14.8 * seq.per, 15);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    video.sequence.push({
        maxFrame: 120,
        forFrame: function (seq) {
            var radian = Math.PI * 0.25 + seq.per * Math.PI * 2;
            var x = Math.cos(radian) * 20,
            z = Math.sin(radian) * 20;
            camera.position.set(x, 15, z);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    video.sequence.push({
        maxFrame: 60,
        forFrame: function (seq) {
            camera.position.set(15, 15 - 14.8 * seq.per, 15);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
