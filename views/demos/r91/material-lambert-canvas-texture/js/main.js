
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
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = 8;
    canvas.height = 8;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // TEXTURE
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // Cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({
                map: texture,
                emissive: 0x000000
            }));
    cube.position.set(0, 50, 0);
    cube.castShadow = true;
    scene.add(cube);

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
                emissive: 0x2a2a2a,
                emissiveIntensity: .5,
                side: THREE.DoubleSide
            }));
    plane.receiveShadow = true;
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight(),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 4;
    spotLight.distance = 1000;
    scene.add(spotLight);
    //scene.add(spotLight.target);

    // set position of spotLight,
    // and helper bust be updated when doing that
    spotLight.position.set(100, 200, -100);
    spotLightHelper.update();

    var frame = 0,
    maxFrame = 500,
    loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        r = Math.PI * 2 * per,
        x = canvas.width / 2 * bias,
        y = canvas.height / 2 * bias,
        z,
        w = canvas.width - canvas.width * bias,
        h = canvas.height - canvas.height * bias;

        requestAnimationFrame(loop);

        ctx.lineWidth = 3;
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ff00ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(x, y, w, h);
        texture.needsUpdate = true;

        x = Math.cos(r) * 200;
        z = Math.sin(r) * 200;

        spotLight.position.set(x, 200, z);
        spotLightHelper.update();

        controls.update();

        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();

}
    ());
