var line, renderer, scene, camera, camera2, controls;
var line1;
var matLine, matLineBasic, matLineDashed;
init();
animate();
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


    // Position and Color Data
    var positions = [],
    colors = [],
    ptCount = 5, //Math.round(12 * points.length),
    color = new THREE.Color(0xff0000);

    var i = 0,
    x,
    y,
    z,
    point;
    while (i < ptCount) {

        x = i;
        y = 0;
        z = i * 5;

        positions.push(x, y, z);
        //color.setHSL(i / ptCount, 1.0, 0.5);
        colors.push(color.r, color.g, color.b);

        i += 1;
    }

    // THREE.Line2 ( LineGeometry, LineMaterial )
    var geometry = new THREE.LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);

    // LINE MATERIAL
    matLine = new THREE.LineMaterial({
            color: 0xffffff,
            linewidth: 10, // in pixels
            vertexColors: THREE.VertexColors,
            dashed: false
        });
    matLine.resolution.set(320, 240);

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

}

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

}
