// creating a group
var createCubeGroup = function(){
    var group = new THREE.Group();
    group.name = 'boxGroup';
    var i = 0,
    len = 4;
    while(i < len){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial());
        cube.position.set(0, 0, 0);
        cube.name = 'cube_' + i;
        group.add(cube);
        i += 1;
    }
    return group;
};
// set group of box objects into a circular position
var toCircleGroup = function(cubeGroup, radianAdjust){
    // RADIAN ADJUST SET TO MATH.PI * 0.5 BY DEFAULT
    radianAdjust = radianAdjust === undefined ? Math.PI * 0.5 : radianAdjust;
    var len = cubeGroup.children.length;
    cubeGroup.children.forEach(function(cube, i){
        var radian = Math.PI * 2 / len * i + radianAdjust,
        x = Math.cos(radian) * 2,
        z = Math.sin(radian) * 2;
        cube.position.set(x, 0, z);
    });
    return cubeGroup;
};

// set cube zero to a bigger scale than the others
var group = createCubeGroup();
toCircleGroup(group);
var cube = group.getObjectByName('cube_0');
cube.scale.set(2, 2, 2);

// box helper
group.add(new THREE.BoxHelper(group));
group.position.set(0, 0, 0);

// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
scene.add(group);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
r = 0,
x, 
z,
v = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), new THREE.MeshBasicMaterial()),
fps = 30;
scene.add(v);
var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;

    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        r += Math.PI / 180 * 5 * secs;
        x = Math.cos(r) * 5;
        z = Math.sin(r) * 5;
        v.position.set(x, 0, z);
        group.lookAt(v.position);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();