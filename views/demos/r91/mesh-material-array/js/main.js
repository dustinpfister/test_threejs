
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // Sphere
    var geometry = new THREE.SphereGeometry(1, 20, 20);

    geometry.faces.forEach(function (face) {

        face.materialIndex = Math.floor(Math.random() * 3);

    });

    var materialArray = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        })
    ];

    var sphere = new THREE.Mesh(

            geometry,

            materialArray);

    scene.add(sphere);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var loop = function () {

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

    };

    loop();

}
    ());
