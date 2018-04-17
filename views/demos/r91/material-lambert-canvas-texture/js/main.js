
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(300, 300, 300);
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
                //color: 0xff0000,
                emissive: 0xffffff,
                emissiveMap: texture
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
    spotLight.distance = 500;
    scene.add(spotLight);

    // set position of spotLight,
    // and helper bust be updated when doing that
    spotLight.position.set(100, 200, -100);
    spotLightHelper.update();

    var frame = 0,
    maxFrame = 500,
    loop = function () {

        //var per = frame / maxFrame,
        //bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);

        controls.update();
        //texture.needsUpdate = true;
        renderer.render(scene, camera);

        //frame += 1;
        //frame = frame % maxFrame;

    };

    loop();

}
    ());
