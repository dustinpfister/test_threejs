//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const points = new THREE.Points(
     new THREE.CylinderGeometry(0.75, 0.75, 4, 20, 20),
new THREE.PointsMaterial( { color: 0x00afaf, size: 0.1 } )
);
scene.add(points);
const lines = new THREE.LineSegments(
     new THREE.EdgesGeometry( new THREE.CylinderGeometry(0.75, 0.75, 4, 20, 20) )
);
lines.position.set(0, 0, 3);
scene.add(lines);
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);      
