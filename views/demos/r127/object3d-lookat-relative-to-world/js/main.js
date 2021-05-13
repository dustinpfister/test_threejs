
// creating a scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(3, 3));

var group = new THREE.Group();

var m1 = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1),
        new THREE.MeshNormalMaterial());
m1.position.set(0, 0, 0);
m1.rotation.set(Math.PI * 0.5, 0, 0);
group.add(m1);
scene.add(group);

group.add(new THREE.BoxHelper(group));

group.position.set(-1, 0, -1);

m1.lookAt(0, 0, 0);

// MAKING THESE TWO MESH OBJECTS LOOK AT EACH OTHER
//m1.lookAt(m2.position);
//m2.lookAt(m1.position);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(2, 4, 2);
camera.lookAt(0,0,0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
