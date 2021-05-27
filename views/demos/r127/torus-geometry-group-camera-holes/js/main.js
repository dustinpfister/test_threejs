var createDonutChild = function(index, len){
    var per = index / len,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    radius = 0.6 + 0.3 * bias,
    tubeRadius = 0.125 + 0.25 * bias,
    radialSegments = 32,
    tubeSegments = 32;
    var donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial());
    donut.geometry.rotateY(Math.PI * 0.5);
    return donut;
};

var createDonutGroup = function(){
    var i = 0,
    len = 20,
    group = new THREE.Group();
    while(i < len){
        var per = i / len,
        radian = Math.PI * 2 * per;
        var donut = createDonutChild(i, len);
        donut.position.set(Math.cos(radian) * 4, 0, Math.sin(radian) * 4);
        donut.lookAt(0, 0, 0);
        group.add(donut);
        i += 1;
    }
    return group;
};

// creating a scene
var scene = new THREE.Scene();
var grid = new THREE.GridHelper(10, 100);
grid.rotation.z = Math.PI * 0.5;
scene.add(grid);

var group = createDonutGroup();
scene.add(group);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// loop
var lt = new Date(),
frame = 0,
maxFrame = 300,
fps = 30;
var loop = function(){
    var now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        var radian = Math.PI * 2 * per;
        camera.position.set(Math.cos(radian) * 4, 0, Math.sin(radian) * 4);
        camera.lookAt(Math.cos(radian + 0.5) * 4, Math.sin(radian) * 0.5, Math.sin(radian + 0.5) * 4);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();