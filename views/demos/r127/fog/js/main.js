
(function () {
    // Scene
    var scene = new THREE.Scene();
    // ADDING BACKGROUND AND FOG
    fogColor = new THREE.Color(0xffffff);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.1);

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    // Geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // A Material that DOES SUPPORT FOG
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
    renderer.setSize(640, 480);
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
        renderer.render(scene, camera);
        frame += 1;
        frame = frame % maxFrame;
    };

    loop();
}
    ());
