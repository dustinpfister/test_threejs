// create a GROUP
var group = new THREE.Group();

// add a Sphere to the group
var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30), 
    new THREE.MeshNormalMaterial());
group.add(sphere);
// add a Box to the group
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshNormalMaterial());
box.position.set(2,0,0);
group.add(box);

// add a BOX HELPER for the GROUP
var helper = new THREE.BoxHelper(group, 0xffffff);
group.add(helper);

// Once the helper is added I can then change the position
group.position.set(0,-1,0);
group.rotation.set(-1,1.57,2);

// start a scene
var scene = new THREE.Scene();
// add the GROUP to the scene
scene.add(group);

// everything else
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
