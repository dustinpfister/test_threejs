
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
    camera.position.set(10, 10, 10);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0, 0, 0);

    scene.add(guy.group);

    // floor
    var floorGeometry = new THREE.PlaneGeometry(100, 100, 8, 8);

    var floor = new THREE.Mesh(

            floorGeometry,

            [
                new THREE.MeshStandardMaterial({

                    color: 0x1a1a1a,
                    side: THREE.DoubleSide

                }),

                new THREE.MeshStandardMaterial({

                    color: 0xafafaf,
                    side: THREE.DoubleSide

                })
            ]);

    floor.geometry.faces.forEach(function (face, i) {

        face.materialIndex = i % 2;

    });

    floor.rotation.set(Math.PI / 2, 0, 0)
    scene.add(floor);

    // PointLIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 20, -20);
    scene.add(light);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    renderer.shadowMap.enabled = true;
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var frame = 0,
    maxFrame = 200;
    var loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        r = Math.PI * 2 * per;

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

        guy.moveArm('arm_right', per, bias * 2);
        guy.moveArm('arm_left', per, 0);
        guy.moveHead(per);
        guy.moveLegs(per);

        guy.group.position.y = 3;
        guy.group.position.x = Math.cos(r) * 5;
        guy.group.position.z = Math.sin(r) * 5;
        guy.group.lookAt(Math.cos(r + 1) * 5, 3, Math.sin(r + 1) * 5);

        frame += 1;
        frame = frame % maxFrame;

    };

    renderer.render(scene, camera);
    loop();

}
    ());
