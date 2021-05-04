(function () {
    var MATERIALS_TREE = {
        sphere: new THREE.MeshStandardMaterial({
            //color: 0x00ff80,
            map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 32, 32, 150),
            side: THREE.DoubleSide
        }),
        trunk: new THREE.MeshStandardMaterial({
            color: 0xffaf80,
            map: canvasTextureMod.randomGrid(['r1', 'r1', '64'], 32, 32, 150),
            side: THREE.DoubleSide
        })
    };
    var MATERIALS_LIGHTS = {
        sun: new THREE.MeshStandardMaterial({
            emissive: 'white',
            emissiveMap: canvasTextureMod.randomGrid(['r1', 'r1', '0'])
        }),
        moon: new THREE.MeshStandardMaterial({
            emissive: 'white',
            emissiveMap: canvasTextureMod.randomGrid(['0', 'r1', 'ri'])
        })
    };
    var MATERIALS_GROUND = {
        grass: new THREE.MeshStandardMaterial({
            color: 'white',
            map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 128, 125, 200),
        })
    };

    // creating a scene
    var scene = new THREE.Scene();

    var world = WorldMod.create({
            MATERIALS_GROUND: MATERIALS_GROUND,
            MATERIALS_TREE: MATERIALS_TREE,
            MATERIALS_LIGHTS: MATERIALS_LIGHTS,
            lightsDPSY: 20
        });
    scene.add(world);

    var world2 = WorldMod.create({
            lightsDPSY: 10
        });
    world2.position.set(-28, -3, -5);
    scene.add(world2);
    var world3 = WorldMod.create({
            lightsDPSY: 20,
            lightsDPSZ: 5
        });
    world3.position.set(-15, -20, -50);
    scene.add(world3);

    // camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(12, 12, 12);
    camera.lookAt(0, 0, 0);

    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    //renderer.width = 640;
    renderer.domElement.width = 640;
    renderer.domElement.height = 480;
    renderer.setViewport(0, 0, 640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);
    var full = false;
    var toggleFull = function (canvas) {
        var canvas = renderer.domElement;
        full = !full;
        container.style.position = 'static';
        container.style.width = '640px';
        container.style.height = '480px';
        canvas.style.width = '640px';
        canvas.style.height = '480px';
        if (full) {
            canvas.style.width = 'auto';
            canvas.style.height = window.innerHeight + 'px';
            canvas.style.margin = 'auto';
            container.style.position = 'fixed';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.background = 'black';
            container.style.left = '0px';
            container.style.top = '0px';
        }
    };
    // press f for full screen
    window.addEventListener('keydown', function (e) {
        if (e.key === 'f') {
            toggleFull();
        }
    });

    var lt = new Date(),
    sunRadian = Math.PI,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            WorldMod.update(world, secs);
            WorldMod.update(world2, secs);
            WorldMod.update(world3, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
