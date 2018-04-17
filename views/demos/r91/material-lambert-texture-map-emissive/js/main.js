
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(250, 250, 250);
    camera.lookAt(0, 0, 0);

    // ORBIT CONTROLS
    var controls = new THREE.OrbitControls(camera);

    // CANVAS

    var draw = (function () {

        var maps = [

            // for texture.map
            {

                which: 'map',

                draw: function (canvas, ctx, data) {

                    var x = canvas.width / 2 * data.bias,
                    y = canvas.height / 2 * data.bias,
                    w = canvas.width - canvas.width * data.bias,
                    h = canvas.height - canvas.height * data.bias;

                    ctx.lineWidth = 3;
                    ctx.fillStyle = '#00ffff';
                    ctx.strokeStyle = '#008f8f';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeRect(x, y, w, h);

                }

            }, {

                which: 'emissiveMap',

                draw: function (canvas, ctx, data) {

                    var x = Math.round(Math.random() * 6),
                    y = Math.round(Math.random() * 6);

                    ctx.lineWidth = 3;
                    ctx.fillStyle = '#0f0f0f';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#2f2f2f';
                    ctx.fillRect(x, y, 2, 2);

                }

            }

        ];

        return function (mesh, data) {

            maps.forEach(function (map) {

                var texture = mesh.material[map.which],
                canvas = texture.image,
                ctx = canvas.getContext('2d');

                map.draw(canvas, ctx, data);

                texture.needsUpdate = true;

                //console.log();


            });

            //texture.needsUpdate = true;

        }

    }
        ());

    var mkCanvasTexture = function () {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 8;
        canvas.height = 8;

        // TEXTURE
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        return texture;

    };

    // Cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({
                map: mkCanvasTexture(), //texture,
                emissive: 0x8f8f8f,
                emissiveMap: mkCanvasTexture()
            }));
    cube.position.set(0, 50, 0);
    cube.castShadow = true;
    scene.add(cube);

    console.log(cube.material.map)

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    renderer.shadowMap.enabled = true;
    document.getElementById('demo').appendChild(renderer.domElement);

    // background
    scene.background = new THREE.Color(0x000000);

    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1500, 1500, 8, 8),
            new THREE.MeshLambertMaterial({
                color: 0x00afaf,
                //emissive: 0x2a2a2a,
                emissiveIntensity: .5,
                side: THREE.DoubleSide
            }));
    plane.receiveShadow = true;
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight();
    var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 4;
    spotLight.distance = 1000;
    scene.add(spotLight);
    //scene.add(spotLight.target);

    // set position of spotLight,
    // and helper bust be updated when doing that
    spotLight.position.set(100, 200, -100);

    var frame = 0,
    maxFrame = 500,
    loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        r = Math.PI * 2 * per,
        x,
        z;

        requestAnimationFrame(loop);

        draw(cube, {
            bias: bias
        });

        cube.position.y = 50 + 100 * bias;

        cube.rotation.set(Math.PI * per, Math.PI * 2 * per, Math.PI * 4 * per);

        x = Math.cos(r) * 200;
        z = Math.sin(r) * 200;

        spotLight.position.set(x, 200, z);
        spotLight.angle = .01 + Math.PI / 4 * bias;
        spotLightHelper.update();

        controls.update();

        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();

}
    ());
