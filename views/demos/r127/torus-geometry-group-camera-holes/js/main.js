var MAIN_RADIUS = 8,
DONUT_COUNT = 30;

var createDonutChild = function(index, len){
    var per = index / len,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    radius = 0.6 + 2.3 * bias,
    tubeRadius = 0.125 + 0.25 * bias,
    radialSegments = 32,
    tubeSegments = 32;
    var donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshStandardMaterial({
           color: 0xffffff,
           emissive: 0x2a0000
        }));
    donut.geometry.rotateY(Math.PI * 0.5);
    return donut;
};

var createDonutGroup = function(){
    var i = 0,
    len = DONUT_COUNT,
    group = new THREE.Group();
    while(i < len){
        var per = i / len,
        radian = Math.PI * 2 * per;
        var donut = createDonutChild(i, len);
        donut.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        donut.lookAt(0, 0, 0);
        group.add(donut);
        i += 1;
    }
    return group;
};

// creating a scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
//var grid = new THREE.GridHelper(10, 100);
//grid.rotation.z = Math.PI * 0.5;
//scene.add(grid);

var group = createDonutGroup();
scene.add(group);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
var light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(2, 0, 0);
camera.add(light);
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// loop
var lt = new Date(),
frame = 0,
maxFrame = 1200,
fps = 24;
var loop = function(){
    var now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        var radian = Math.PI * 2 * per;
        camera.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        camera.lookAt(Math.cos(radian + 0.5) * MAIN_RADIUS, Math.sin(radian) * 0.5, Math.sin(radian - 0.5) * MAIN_RADIUS);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();