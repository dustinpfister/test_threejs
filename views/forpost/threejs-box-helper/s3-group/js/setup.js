// create a GROUP
var group = new THREE.Group();

// adding a Sphere, and box to the group, and
// adjusting the position of one of the children of the group
group.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30), 
    new THREE.MeshNormalMaterial()));
group.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshNormalMaterial()));
group.children[1].position.set(2, 0, 0);

// BOX HELPER
group.add(new THREE.BoxHelper(group, 0xffffff));

// Once the helper is added I can then change the position
group.position.set(0,0,0);
group.rotation.set(0,1,1);

// start a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8, 8, 0xffffff, 0xff0000));
// add the GROUP to the scene
scene.add(group);

// everything else
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
