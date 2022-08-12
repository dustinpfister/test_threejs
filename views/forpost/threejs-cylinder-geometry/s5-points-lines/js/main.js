//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// POINTS
//******** **********
var points = new THREE.Points(
     new THREE.CylinderGeometry(0.75, 0.75, 4, 20, 20),
new THREE.PointsMaterial( { color: 0x00afaf, size: 0.1 } )
);
scene.add(points);
//******** **********
// LINES
//******** **********
var lines = new THREE.LineSegments(
     new THREE.EdgesGeometry( new THREE.CylinderGeometry(0.75, 0.75, 4, 20, 20) )
);
lines.position.set(0, 0, 3);
scene.add(lines);

//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
