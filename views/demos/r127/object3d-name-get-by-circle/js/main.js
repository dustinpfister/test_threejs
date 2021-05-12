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
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);


renderer.render(scene, camera);
