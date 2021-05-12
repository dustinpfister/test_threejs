// creating a group
var createCircleGroup = function(){
    var group = new THREE.Group();
    group.name = 'boxGroup';
    var i = 0,
    len = 5;
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

var group = createCircleGroup();

// box helper
group.add(new THREE.BoxHelper(group));
group.position.set(0, 0, 0);

// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
scene.add(group);

// GETTING BOX1 BY THE NAME
var box = group.getObjectByName('box0');
box.rotation.set(Math.PI / 180 * 45, 0, 0);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
