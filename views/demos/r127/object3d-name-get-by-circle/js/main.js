// creating a group
var createBoxGroup = function(count){
    var group = new THREE.Group();
    group.name = 'boxGroup';
    var i = 0,
    box,
    len = count;
    while(i < len){
        box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        box.name = 'box_' + i;
        group.add(box);
        i += 1;
    }
    return group;
};
// set group of box objects into a circular position
var toCircleGroup = function(boxGroup, radianAdjust){
    // RADIAN ADJUST SET TO MATH.PI * 0.5 BY DEFAULT
    radianAdjust = radianAdjust === undefined ? Math.PI * 0.5 : radianAdjust;
    var len = boxGroup.children.length;
    boxGroup.children.forEach(function(box, i){
        var radian = Math.PI * 2 / len * i + radianAdjust,
        x = Math.cos(radian) * 2,
        z = Math.sin(radian) * 2;
        box.position.set(x, 0, z);
    });
    return boxGroup;
};

// SETTING SCALE OF BOX GROUP AND GETTING BOX OBJECTS BY NAME
// WHEN DOING SO
var createObject1 = function(){
    var group = createBoxGroup(4);
    toCircleGroup(group);
    // set cube zero to a bigger scale than the others
    // this should be the front
    var box = group.getObjectByName('box_0');
    box.scale.set(3, 3, 4);
    // side box objects
    var box = group.getObjectByName('box_1');
    box.scale.set(8, 1, 1);
    var box = group.getObjectByName('box_3');
    box.scale.set(8, 1, 1);
    // rear box object
    var box = group.getObjectByName('box_2');
    box.scale.set(1, 1, 12);
    return group
};

// create a group
var group = createObject1();
// box helper
group.add(new THREE.BoxHelper(group));
// scene
var scene = new THREE.Scene();
// grid helper
scene.add(new THREE.GridHelper(5, 5));
// add group
scene.add(group);
// dir mesh
var dir = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25), 
    new THREE.MeshBasicMaterial());
scene.add(dir);
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
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
