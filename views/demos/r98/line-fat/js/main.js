var createFatLineGeometry = function (opt) {

    opt = opt || {};
    opt.forPoint = opt.forPoint || function (i, per) {
        return {
            x: i * 5,
            y: 0,
            z: 0
        }
    };
    opt.ptCount = opt.ptCount === undefined ? 20 : opt.ptCount;
    opt.colorSolid = opt.colorSolid === undefined ? false : opt.colorSolid;
    opt.color = opt.color === undefined ? new THREE.Color(0xffffff) : opt.color;

    // Position and Color Data
    var positions = [],
    colors = [],
    i = 0,
    point,
    geo;

    // for each point
    while (i < opt.ptCount) {

        // push point
        point = opt.forPoint(i, i / opt.ptCount);
        positions.push(point.x, point.y, point.z);

        // push color
        if (!opt.colorSolid) {
            opt.color.setHSL(i / opt.ptCount, 1.0, 0.5);
        }
        colors.push(opt.color.r, opt.color.g, opt.color.b);

        i += 1;
    }

    // return geo
    geo = new THREE.LineGeometry();
    geo.setPositions(positions);
    geo.setColors(colors);
    return geo;

};

var createFatLine = function (opt) {

    opt = opt || {};
    opt.width = opt.width || 5;

    // LINE MATERIAL
    var matLine = new THREE.LineMaterial({
            linewidth: opt.width, // in pixels
			color: 0xff0000
            //vertexColors: THREE.VertexColors
        });
    matLine.trasparent = true;
    matLine.opacity = 0.4;
    matLine.resolution.set(320, 240);

    var line = new THREE.Line2(opt.geo, matLine);

    return line;

};

(function () {

    // RENDER
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(-40, 0, 60);

    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // CREATE FAT LINE
    var line = createFatLine({
            width: 10,
            geo: createFatLineGeometry({
                ptCount: 80,
                colorSolid: true,
                color: new THREE.Color(0x00ff00),
                forPoint: function (i, per) {
                    return {
                        x: i * 1.5,
                        y: Math.cos(Math.PI * 4 * (per)) * 10,
                        z: Math.sin(Math.PI * 4 * (per)) * 10
                    }
                }
            })
        });

    scene.add(line);

    // CREATE ANOTHER FAT LINE
    line = createFatLine({
            width: 10,
            geo: createFatLineGeometry()
        });
    scene.add(line);

    // LOOP
    var loop = function () {

        requestAnimationFrame(loop);

        // main scene
        renderer.setClearColor(0x000000, 0);
        renderer.setViewport(0, 0, 320, 240);

        // renderer will set this eventually
        renderer.render(scene, camera);
        renderer.setClearColor(0x222222, 1);
        renderer.clearDepth();

    };

    loop();

}
    ());
