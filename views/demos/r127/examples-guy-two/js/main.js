// creating a scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10, 'white', 'lime') );

var guy = Guy2.create({spacing: 0.05});
scene.add(guy);

var box = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial() );
box.position.set(3, 0, 3);
scene.add(box);

guy.lookAt(box.position);


// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
