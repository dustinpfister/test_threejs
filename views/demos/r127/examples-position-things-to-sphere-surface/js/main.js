var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

var createWrap = function () {
    // create a wrap group
    var wrap = new THREE.Group();
    // add a sphere to the wrap
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 40, 40),
            new THREE.MeshNormalMaterial({
                wireframe: true
            }));
    wrap.userData.sphere = sphere;
    wrap.add(sphere);
    // create a surface group and add to wrap
    var surface = new THREE.Group();
    wrap.userData.surface = surface;
    wrap.add(surface);

    return wrap;
};

var addObjectToWrap = function (wrap) {
    // create a cube and add to surface group
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial({
                wireframe: false
            }));
    cube.name = 'cube';
    wrap.userData.cube = cube;
    wrap.userData.surface.add(cube);
};

var setObjToLatLong = function (wrap, childName, latPer, longPer) {
    var child = wrap.getObjectByName(childName),
    surface = wrap.userData.surface,
    d = 1.25;
    // set lat
    var radian = Math.PI * -0.5 + Math.PI * latPer,
    x = Math.cos(radian) * d,
    y = Math.sin(radian) * d;
    child.position.set(x, y, 0);
    // set long
    surface.rotation.y = Math.PI * 2 * longPer;
    // look at origin
    child.lookAt(0, 0, 0);
};

// add wrap the the scene
var wrap = createWrap();
addObjectToWrap(wrap);
scene.add(wrap);

// distance, lat, and long values
var d = 1.25, // radius + half of mesh height
latPer = 0.75, // 0 - 1
longPer = 0.5; // 0 - 1

setObjToLatLong(wrap, 'cube', latPer, longPer);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var lt = new Date(),
frame = 0,
maxFrame = 600,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;

    requestAnimationFrame(loop);

    if (secs > 1 / fps) {
        latPer = Math.sin(Math.PI * bias);
        longPer = per;
        setObjToLatLong(wrap, 'cube', latPer, longPer);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
