// creating a group
var createBoxGroup = function(count){
    var group = new THREE.Group();
    group.name = 'boxGroup';
    var i = 0,
    box,
    len = count;
    while(i < len){
        box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        box.name = 'box_' + i;
        group.add(box);
        i += 1;
    }
    return group;
};

// SETTING SCALE OF BOX GROUP AND GETTING BOX OBJECTS BY NAME
// WHEN DOING SO
var createObject1 = function(){
    var group = createBoxGroup(4);
    // set cube zero to a bigger scale than the others
    // this should be the front
    var box = group.getObjectByName('box_0');
    box.scale.set(1, 1, 3);
    box.position.set(0, 0, 1);
    // side box objects
    box = group.getObjectByName('box_1');
    box.scale.set(1, 1, 1);
    box.position.set(2, 0, 0);
    box = group.getObjectByName('box_2');
    box.scale.set(1, 1, 1);
    box.position.set(-2, 0, 0);
    // rear
    box = group.getObjectByName('box_3');
    box.scale.set(1, 1, 1);
    box.position.set(0, 0, -2);
    return group
};

// create a group
var group = createObject1();
// box helper
group.add(new THREE.BoxHelper(group));
// scene
var scene = new THREE.Scene();
// grid helper
scene.add(new THREE.GridHelper(7, 7));
// add group
scene.add(group);
// dir mesh
var dir = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25), 
    new THREE.MeshBasicMaterial());
scene.add(dir);
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// loop
var lt = new Date(),
frame = 0,
maxFrame = 600,
r = 0,
x, 
z,
fps = 30;
var loop = function(){
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        r = Math.PI  * 2 * per;
        x = Math.cos(r) * 5;
        z = Math.sin(r) * 5;
        dir.position.set(x, 5 * Math.sin(Math.PI * 4 * per), z);
        group.lookAt(dir.position);
        renderer.render(scene, camera);
        lt = now;
        frame += fps * secs;
        frame %= maxFrame;
    }
};
loop();
