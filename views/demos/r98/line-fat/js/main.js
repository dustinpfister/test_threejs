var line, renderer, scene, camera, camera2, controls;
var line1;
var matLine, matLineBasic, matLineDashed;

var createFatLineGeometry = function (opt) {

    opt = opt || {};
    opt.forPoint = opt.forPoint || function (i, per) {

        return {

            x: -50 + i * 5,
            y: Math.cos(Math.PI * 2 * (per)) * 10,
            z: Math.sin(Math.PI * 2 * (per)) * 5

        }
    };

    opt.ptCount = opt.ptCount === undefined ? 20 : opt.ptCount;
    opt.colorSolid = opt.colorSolid === undefined ? false : opt.colorSolid;

    // Position and Color Data
    var positions = [],
    colors = [],
    //ptCount = opt.ptCount === undefined20, //Math.round(12 * points.length),
    color = new THREE.Color(0xff0000),
    i = 0,
    x,
    y,
    z,
    point,
    geo;

    // for each point
    while (i < opt.ptCount) {
        point = opt.forPoint(i, i / opt.ptCount);
        positions.push(point.x, point.y, point.z);

        if (!opt.colorSolid) {
            color.setHSL(i / opt.ptCount, 1.0, 0.5);
        }
        colors.push(color.r, color.g, color.b);
        i += 1;
    }

    // THREE.Line2 ( LineGeometry, LineMaterial )
    geo = new THREE.LineGeometry();
    geo.setPositions(positions);
    geo.setColors(colors);

    return geo;

};

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(-40, 0, 60);

    // controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var geometry = createFatLineGeometry({
		
		colorSolid : true
		
	});

    // LINE MATERIAL
    matLine = new THREE.LineMaterial({
            color: 0xffffff,
            linewidth: 10, // in pixels
            vertexColors: THREE.VertexColors,
            dashed: false
        });
    matLine.resolution.set(320, 240);

    line = new THREE.Line2(geometry, matLine);

    scene.add(line);

};

function animate() {
    requestAnimationFrame(animate);
    //stats.update();
    // main scene
    renderer.setClearColor(0x000000, 0);
    renderer.setViewport(0, 0, 320, 240);

    // renderer will set this eventually
    //matLine.resolution.set(320, 240); // resolution of the viewport
    renderer.render(scene, camera);

    // inset scene
    renderer.setClearColor(0x222222, 1);
    renderer.clearDepth(); // important!

};

init();
animate();
