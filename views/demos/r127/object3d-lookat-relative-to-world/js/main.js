
// creating a scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(7, 7));

var m1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
//m1.position.set(0, 0, 4);
scene.add(m1);


// MAKING THESE TWO MESH OBJECTS LOOK AT EACH OTHER
//m1.lookAt(m2.position);
//m2.lookAt(m1.position);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(5, 7, 5);
camera.lookAt(0,0,0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
