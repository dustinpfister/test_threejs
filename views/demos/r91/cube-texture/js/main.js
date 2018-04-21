
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

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

        //camera.position.z = 1 * 14 * bias;
        //camera.lookAt(0, 0, 0);
        //controls.update();

        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    new THREE.CubeTextureLoader()
    .setPath('/img/cube/skybox/')
    .load([
            'px.jpg',
            'nx.jpg',
            'py.jpg',
            'ny.jpg',
            'pz.jpg',
            'nz.jpg'
        ],

        function (cubeTexture) {

        console.log('we be good man');
        //console.log(one);

        // Geometry
        var geometry = new THREE.SphereGeometry(1, 20, 20);

        // Material
        var material = new THREE.MeshBasicMaterial({

                envMap: cubeTexture

            });

        // Mesh
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        loop();

    });

}
    ());
