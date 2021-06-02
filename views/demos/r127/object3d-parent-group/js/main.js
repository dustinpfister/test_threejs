var createGroup = function(gid){
    var group = new THREE.Group();
    group.name = 'group_' + gid;
    // adding a cone
    var cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 10, 10),
        new THREE.MeshNormalMaterial());
    cone.geometry.rotateX(Math.PI * 0.5);
    cone.position.set(0, 0, 2.0);
    cone.name = 'mesh_ ' + group.name + '_cone';
    group.add(cone);
    // adding a box
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 3),
        new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    box.name = 'mesh_ ' + group.name + '_cone';
    group.add(box);  
    return group;
};


// scene
var scene = new THREE.Scene();
scene.name = 'scene_myWorld';
scene.add(new THREE.GridHelper(9, 9));

var group = createGroup('0');
scene.add(group);
group.lookAt(-10, 10, -10);

group = createGroup('1');
group.position.set(3, 1.5, 0);
group.lookAt(3, 10, 0);
scene.add(group);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
