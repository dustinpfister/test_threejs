// creating a group
var createCubeGroup = function(){
    var group = new THREE.Group();
    group.name = 'boxGroup';
    var i = 0,
    len = 4;
    while(i < len){
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        box.name = 'box' + i;
        group.add(box);
        i += 1;
    }
    return group;
};

var toCircleGroup = function(cubeGroup){
    var len = cubeGroup.children.length;
    cubeGroup.children.forEach(function(cube, i){
        var radian = Math.PI * 2 / len * i,
        x = Math.cos(radian) * 2,
        z = Math.sin(radian) * 2;
        cube.position.set(x, 0, z);
    });
    return cubeGroup;
};

var group = createCubeGroup();
toCircleGroup(group);

// box helper
group.add(new THREE.BoxHelper(group));
group.position.set(0, 0, 0);

// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
scene.add(group);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
