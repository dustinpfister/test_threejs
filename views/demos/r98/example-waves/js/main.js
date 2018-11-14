

(function () {

    var waveGrid = function (opt) {

        opt = opt || {};
        opt.width = opt.width || 20;
        opt.depth = opt.depth || 20;
        opt.height = opt.height || 1;
        opt.forPoint = opt.forPoint || function () {};
        opt.context = opt.context || opt;
        opt.xStep = opt.xStep || 0.075;
        opt.yStep = opt.yStep || 0.1;
        opt.zStep = opt.zStep || 0.075;
        opt.waveOffset = opt.waveOffset === undefined ? 0 : opt.waveOffset;

        var points = [],
        x,
        i,
        y,
        z;

        // points
        i = 0;
        x = 0;
        while (x < opt.width) {
            z = 0;
            while (z < opt.depth) {
                per = (z / opt.depth + (1 / opt.width * x) + opt.waveOffset) % 1;
                y = Math.cos(Math.PI * 4 * per) * opt.height;
                opt.forPoint.call(opt.context, x * opt.xStep, y * opt.yStep, z * opt.zStep, i);
                z += 1;
                i += 3;
            }
            x += 1;
        };

    };

    // make a new Float32Array of Points to make a buffered geometry
    makeWaveGrid = function (opt) {
        opt = opt || {};
        var points = [];
        opt.forPoint = function (x, y, z, i) {
            points.push(x, y, z);
        };
        waveGrid(opt);
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
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, .001, 1000);
    camera.position.set(2, 2, 2);

    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    renderer.render(scene, camera);

    // LOOP
    var frame = 0,
    maxFrame = 100;
    var loop = function () {

        requestAnimationFrame(loop);

        var position = geometry.getAttribute('position'),
        per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / .5;

        // update points
        waveGrid({
            waveOffset: per,
            forPoint: function (x, y, z, i) {
                position.array[i] = x - 2;
                position.array[i + 1] = y - 2;
                position.array[i + 2] = z - 2;
            }
        });
        position.needsUpdate = true;

        renderer.render(scene, camera);

        frame += 1;
        frame %= maxFrame;

    };

    loop();

}
    ());
