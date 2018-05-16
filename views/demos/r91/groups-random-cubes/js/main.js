
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 20);
    camera.position.set(3, 3, 3);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0, 0, 0);

    // creating an instance of Object3D
    var group = new THREE.Group();

    var i = 0,
    iCount = 10,

    // random x,y,z parameter
    rndParam = function () {

        return -1 + 2 * Math.random();

    },

    // random Euler angle
    rndAng = function () {

        return Math.PI * 2 * Math.random();

    };
    while (i < iCount) {

        var boxGeometry = new THREE.BoxGeometry(1, 1, 1),

        box = new THREE.Mesh(boxGeometry, new THREE.MeshDepthMaterial({}));

        box.position.set(rndParam(), rndParam(), rndParam());

        box.rotation.set(rndAng(), rndAng(), rndAng());

        group.add(box);

        i += 1;

    }

    scene.add(group);

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

        group.rotation.set(0, Math.PI * 2 * per, 0)

        frame += 1;
        frame = frame % maxFrame;

    };

    renderer.render(scene, camera);
    loop();

}
    ());
