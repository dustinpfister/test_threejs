var line, renderer, scene, camera, camera2, controls;
var line1;
var matLine, matLineBasic, matLineDashed;
var stats;
var gui;
// viewport
var insetWidth;
var insetHeight;
init();
animate();
function init() {
    renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set( - 40, 0, 60);
    camera2 = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    camera2.position.copy(camera.position);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;
    // Position and Color Data
    var positions = [];
    var colors = [];
    var points = hilbert3D(new THREE.Vector3(0, 0, 0), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7);
    var spline = new THREE.CatmullRomCurve3(points);
    var divisions = Math.round(12 * points.length);
    var color = new THREE.Color();
    for (var i = 0, l = divisions; i < l; i++) {
        var point = spline.getPoint(i / l);
        positions.push(point.x, point.y, point.z);
        color.setHSL(i / l, 1.0, 0.5);
        colors.push(color.r, color.g, color.b);
    }
    // THREE.Line2 ( LineGeometry, LineMaterial )
    var geometry = new THREE.LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);
    matLine = new THREE.LineMaterial({
            color: 0xffffff,
            linewidth: 5, // in pixels
            vertexColors: THREE.VertexColors,
            //resolution:  // to be set by renderer, eventually
            dashed: false
        });
    line = new THREE.Line2(geometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    scene.add(line);
    // THREE.Line ( BufferGeometry, LineBasicMaterial ) - rendered with gl.LINE_STRIP
    var geo = new THREE.BufferGeometry();
    geo.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    matLineBasic = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors
        });
    matLineDashed = new THREE.LineDashedMaterial({
            vertexColors: THREE.VertexColors,
            scale: 2,
            dashSize: 1,
            gapSize: 1
        });
    line1 = new THREE.Line(geo, matLineBasic);
    line1.computeLineDistances();
    line1.visible = false;
    scene.add(line1);
    //
    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();
    //stats = new Stats();
    //document.body.appendChild(stats.dom);
    //initGui();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    insetWidth = window.innerHeight / 4; // square
    insetHeight = window.innerHeight / 4;
    camera2.aspect = insetWidth / insetHeight;
    camera2.updateProjectionMatrix();
}
function animate() {
    requestAnimationFrame(animate);
    //stats.update();
    // main scene
    renderer.setClearColor(0x000000, 0);
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    // renderer will set this eventually
    matLine.resolution.set(window.innerWidth, window.innerHeight); // resolution of the viewport
    renderer.render(scene, camera);
    // inset scene
    renderer.setClearColor(0x222222, 1);
    renderer.clearDepth(); // important!
    renderer.setScissorTest(true);
    renderer.setScissor(20, window.innerHeight - insetHeight - 20, insetWidth, insetHeight);
    renderer.setViewport(20, window.innerHeight - insetHeight - 20, insetWidth, insetHeight);
    camera2.position.copy(camera.position);
    camera2.quaternion.copy(camera.quaternion);
    // renderer will set this eventually
    matLine.resolution.set(insetWidth, insetHeight); // resolution of the inset viewport
    renderer.render(scene, camera2);
    renderer.setScissorTest(false);
}
//
function initGui() {
    gui = new dat.GUI();
    var param = {
        'line type': 0,
        'width (px)': 5,
        'dashed': false,
        'dash scale': 1,
        'dash / gap': 1
    };
    gui.add(param, 'line type', {
        'LineGeometry': 0,
        'gl.LINE': 1
    }).onChange(function (val) {
        switch (val) {
        case '0':
            line.visible = true;
            line1.visible = false;
            break;
        case '1':
            line.visible = false;
            line1.visible = true;
            break;
        }
    });
    gui.add(param, 'width (px)', 1, 10).onChange(function (val) {
        matLine.linewidth = val;
    });
    gui.add(param, 'dashed').onChange(function (val) {
        matLine.dashed = val;
        // dashed is implemented as a defines -- not as a uniform. this could be changed.
        // ... or LineDashedMaterial could be implemented as a separate material
        // temporary hack - renderer should do this eventually
        if (val)
            matLine.defines.USE_DASH = "";
        else
            delete matLine.defines.USE_DASH;
        matLine.needsUpdate = true;
        line1.material = val ? matLineDashed : matLineBasic;
    });
    gui.add(param, 'dash scale', 0.5, 2, 0.1).onChange(function (val) {
        matLine.dashScale = val;
        matLineDashed.scale = val;
    });
    gui.add(param, 'dash / gap', {
        '2 : 1': 0,
        '1 : 1': 1,
        '1 : 2': 2
    }).onChange(function (val) {
        switch (val) {
        case '0':
            matLine.dashSize = 2;
            matLine.gapSize = 1;
            matLineDashed.dashSize = 2;
            matLineDashed.gapSize = 1;
            break;
        case '1':
            matLine.dashSize = 1;
            matLine.gapSize = 1;
            matLineDashed.dashSize = 1;
            matLineDashed.gapSize = 1;
            break;
        case '2':
            matLine.dashSize = 1;
            matLine.gapSize = 2;
            matLineDashed.dashSize = 1;
            matLineDashed.gapSize = 2;
            break;
        }
    });
}
