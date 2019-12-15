
var clock = {};

clock.createFace = function (cx, cy, radius) {
    cx = cx || 0;
    cy = cy || 0;
    radius = radius || 10;
    var faceMarks = [],
    marks = 12,
    i = 0,
    x,
    y,
    z;
    while (i < marks) {
        rad = Math.PI * 2 / marks * i;
        x = Math.cos(rad) * radius + cx;
        y = Math.sin(rad) * radius + cy;
        z = 0;
        faceMarks.push([x, y, z]);
        i += 1;
    }
    return faceMarks;
};

clock.get = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = c.now.getTime();
    c.secPer = c.now.getMilliseconds() / 1000;
    c.minPer = c.now.getSeconds() / 60;
    c.hourPer = c.now.getMinutes() / 24;
    var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0, 0);
    c.dayPer = (c.now - dayStart) / 86400000;
    return c;
};

(function () {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var materials = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

    var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials[0]);
    scene.add(cube);

    camera.position.set(2, 2, 2);
    camera.lookAt(cube.position);
    renderer.setSize(320, 240);

    console.log(clock.createFace())

    // loop
    var loop = function () {
        var c = clock.get(new Date());
        cube.rotation.set(0, Math.PI * 2 * c.secPer, 0);
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}
    ());
