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

var setObjToLatLong = function (wrap, childName, latPer, longPer, dist) {
    var childWrap = wrap.getObjectByName('childwrap_' + childName),
    child = wrap.getObjectByName(childName),
    surface = wrap.userData.surface;
    // set lat
    var radian = Math.PI * -0.5 + Math.PI * latPer,
    x = Math.cos(radian) * dist,
    y = Math.sin(radian) * dist;
    child.position.set(x, y, 0);
    // set long
    childWrap.rotation.y = Math.PI * 2 * longPer;
    // look at origin
    child.lookAt(0, 0, 0);
};

var addObjectToWrap = function (wrap, objectName) {
    // create a cube and add to surface group
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial({
                wireframe: false
            }));
    cube.name = objectName;
    //wrap.userData.cube = cube;
    var childWrap = new THREE.Group();
    childWrap.name = 'childwrap_' + objectName;
    childWrap.add(cube);
    // child wrap user data object
    var ud = childWrap.userData;
    ud.latPer = 0;
    ud.longPer = 0;
    ud.dist = 1.25;
    // add the childWrap group to the surface group
    wrap.userData.surface.add(childWrap);

    setObjToLatLong(wrap, objectName, ud.latPer, ud.longPer, ud.dist);
};

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// add wrap the the scene
var wrap = createWrap();
scene.add(wrap);
addObjectToWrap(wrap, 'cube');
addObjectToWrap(wrap, 'cube2');
// dist and lat log values
var dist = 1.25, // radius + half of mesh height
latPer = 0.75, // 0 - 1
longPer = 0.5; // 0 - 1
setObjToLatLong(wrap, 'cube', latPer, longPer, dist);
// loop
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
        latPer = 0.25 + Math.sin(Math.PI * bias) * 0.5;
        longPer = per;
        setObjToLatLong(wrap, 'cube', latPer, longPer, dist);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
