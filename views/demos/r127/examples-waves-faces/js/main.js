(function () {

    // Wave grid helper
    var waveGrid = function (opt) {
        opt = opt || {};
        opt.width = opt.width || 18;
        opt.depth = opt.depth || 18;
        opt.height = opt.height || 2;
        opt.forPoint = opt.forPoint || function () {};
        opt.context = opt.context || opt;
        opt.xStep = opt.xStep || 0.075;
        opt.yStep = opt.yStep || 0.1;
        opt.zStep = opt.zStep || 0.075;
        opt.waveOffset = opt.waveOffset === undefined ? 0 : opt.waveOffset;
        var points = [],
        radPer,
        x = 0,
        i = 0,
        y,
        z;
        // points
        while (x < opt.width) {
            z = 0;
            while (z < opt.depth) {
                // radian percent
                radPer = (z / opt.depth + (1 / opt.width * x) + opt.waveOffset) % 1;
                // y value of point
                y = Math.cos(Math.PI * 4 * radPer) * opt.height;
                // call forPoint
                opt.forPoint.call(opt.context, x * opt.xStep, y * opt.yStep, z * opt.zStep, i);
                // step z, and point index
                z += 1;
                i += 3;
            }
            x += 1;
        };
    };

    // make and add just the 'positions' attribute for the given buffer geometry
    var makePositions = function (geometry, opt) {
        var points = [];
        opt = {};
        opt.forPoint = function (x, y, z, i) {
            points.push(x, y, z);
        };
        waveGrid(opt);
        var vertices = new Float32Array(points);
        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    };

    // make a points mesh
    var makePoints = function (opt) {
        opt = opt || {};
        var geometry = new THREE.BufferGeometry();
        // add positions
        makePositions(geometry, opt);
        return new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .125,
                color: new THREE.Color(0.0, 0.25, 0.25)
            }));
    };

    // make a points mesh
    var makeMesh = function (opt) {
        opt = opt || {};
        var geometry = new THREE.BufferGeometry();
        // add positions
        makePositions(geometry, opt);
        return new THREE.Mesh(
            // geometry as first argument
            geometry,
            // Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            }));
    };

    // update points
    var updatePositions = function (points, per) {
        var position = points.geometry.getAttribute('position');
        // update points
        waveGrid({
            waveOffset: per,
            xStep: 0.125,
            zStep: 0.125,
            forPoint: function (x, y, z, i) {
                position.array[i] = x - 2;
                position.array[i + 1] = y - 2;
                position.array[i + 2] = z - 2;
            }
        });
        position.needsUpdate = true;
    }

    // RENDER
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // SCENE
    var scene = new THREE.Scene();
    var fogColor = new THREE.Color(1.0, 1.0, 1.0);
    scene.background = fogColor;
    //scene.fog = new THREE.FogExp2(fogColor, 0.3);

    // mesh
    var mesh = makeMesh();

    mesh.geometry.addGroup(0, 3, 0);

    scene.add(mesh);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, .001, 1000);

    // position of mesh an camera
    mesh.position.set(0, 1, 0);
    camera.position.set(4, 4, 3);

    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // LOOP
    var frame = 0,
    maxFrame = 300,
    lt = new Date(),
    fps = 30,
    loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;

        requestAnimationFrame(loop);

        if (secs > 1 / fps) {
            //updatePositions(mesh, per * 8 % 1);
            var d = 0.5 + 2.5 * (1 - bias);
            //camera.position.set(d, 2.5, d);
            //camera.lookAt(-10, -10, -10);
            //camera.rotation.z = Math.PI * 2 * per;
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };

    console.log(new THREE.BoxGeometry());

    loop();

}
    ());
