(function () {

    var geometry = new THREE.Geometry();

    var x = 0,
    per,
    y,
    z;

    // points
    while (x < 5) {
        z = 0;
        while (z < 10) {

            per = z / 10 + .125 * x % 1;

            y = Math.cos(Math.PI * 4 * per) * 1;
            geometry.vertices.push(new THREE.Vector3(x, y, z));
            z += .25;
        }
        x += .25;
    };

    // RENDER
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // SCENE
    var scene = new THREE.Scene();

    var points = new THREE.Points(

            // geometry as first argument
            geometry,

            // then Material
            new THREE.PointsMaterial({

                size: .05

            }));

    scene.add(points);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(10, 10, 10);

    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // LOOP
    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
