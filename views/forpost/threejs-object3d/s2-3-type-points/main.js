//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// POINTS OBJECT - is also based on object3d
//-------- ----------
// cretaing points with a built in geometry
const geo1 = new THREE.SphereGeometry(5, 60, 60);
const mat1 = new THREE.PointsMaterial({ size: 0.25, color: new THREE.Color(0, 1, 0) });
const points1 = new THREE.Points(geo1, mat1);
scene.add(points1);
// object3d rotation prop of points object
points1.rotation.z = Math.PI / 180 * 45;
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(points1.position);
renderer.render(scene, camera);
