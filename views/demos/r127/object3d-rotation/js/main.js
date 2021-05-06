
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(3, 1, 3);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0,  - .5, 0);

    // creating an instance of Object3D
    var obj = new THREE.Object3D();

    //{"_x":0,"_y":0,"_z":0,"_order":"XYZ"}
    console.log(JSON.stringify(obj.rotation));

    obj.rotation.set(0, 0, Math.PI * 1.75);

    // {"_x":0,"_y":0,"_z":5.497787143782138,"_order":"XYZ"}
    console.log(JSON.stringify(obj.rotation));

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var frame = 0,
    maxFrame = 100;
    var loop = function () {

        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    renderer.render(scene, camera);
    loop();

}
    ());
