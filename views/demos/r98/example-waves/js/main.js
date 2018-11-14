

(function () {

    var makeWaveGrid = function (opt) {

        opt = opt || {};
        opt.width = opt.width || 5;
        opt.depth = opt.depth || 10;
        opt.height = opt.height || 1;

        var points = [],
        x,
        y,
        z;

        // points
        x = 0;
        while (x < opt.width) {
            z = 0;
            while (z < opt.depth) {

                per = z / opt.depth + .125 * x % 1;
                y = Math.cos(Math.PI * 4 * per) * opt.height;
                //geometry.vertices.push(new THREE.Vector3(x, y, z));

                points.push(x, y, z);

                z += .25;
            }
            x += .25;
        };

        return new Float32Array(points);

    };

    var geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    var vertices = makeWaveGrid();
    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

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
