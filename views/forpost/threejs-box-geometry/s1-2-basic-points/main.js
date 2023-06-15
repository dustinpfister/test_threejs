//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(5, 5) );
const material = new THREE.PointsMaterial( { size: 0.05, color: 0x00ff00 } );
// 1
const points1 = new THREE.Points(
    new THREE.BoxGeometry(1, 1, 1, 1, 1, 1),
    material );
points1.position.set(-2, 0, 0);
scene.add(points1);
// 2
const points2 = new THREE.Points(
    new THREE.BoxGeometry(1, 1, 1, 6, 6, 6),
    material );
points2.position.set(0, 0, 0);
scene.add(points2);
// 3
const points3 = new THREE.Points(
    new THREE.BoxGeometry(1, 1, 1, 16, 4, 16),
    material );
points3.position.set(2, 0, 0);
scene.add(points3);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);