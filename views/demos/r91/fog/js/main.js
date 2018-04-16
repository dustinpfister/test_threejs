
(function () {

    // Scene
    var scene = new THREE.Scene();
    fogColor = new THREE.Color(0xffffff);

    scene.background = fogColor;
    //scene.fog = new THREE.Fog(fogColor, 0.0025, 20);
	scene.fog = new THREE.FogExp2(fogColor, 0.1);

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    //var controls = new THREE.OrbitControls(camera);

    // Geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // Material
    var material = new THREE.MeshNormalMaterial();

    console.log(material.fog); // false

    var material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            emissive: 0x080808
        });

    console.log(material.fog); // true

    // Mesh
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Loop
    var frame = 0,
    maxFrame = 500,
    loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);

        camera.position.z = 1 * 14 * bias;
        camera.lookAt(0, 0, 0);
        //controls.update();

        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();
}
    ());
