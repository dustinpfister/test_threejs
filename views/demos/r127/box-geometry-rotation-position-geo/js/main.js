
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10)); // grid helper

var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('gray')
        }));
box.add(new THREE.BoxHelper(box, new THREE.Color('red'))); // box helper
scene.add(box);

var box2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('gray')
        }));
box2.geometry.rotateY(Math.PI * 0.25); // ROTATING THE GEOMERTY
box2.geometry.translate(0, 1, 0); // TRANSLATING THE GEOMMETRY
box2.add(new THREE.BoxHelper(box2, new THREE.Color('red'))); // box helper
box2.position.set(2, 0, 0); // SETTING THE POSITION OF THE MESH
scene.add(box2);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
