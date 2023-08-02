//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// POINTS MATERIAL
//-------- ----------
const material1 = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 0.8,
    sizeAttenuation: true
});
const material2 = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 10,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.2
});
//-------- ----------
// GEOMETRY / SCENE CHILD OBJECTS
//-------- ----------
const geometry = new THREE.BoxGeometry(7, 7, 7, 3, 3, 3);
const points1 = new THREE.Points(geometry, material1);
scene.add(points1);
const points2 = new THREE.Points(geometry, material2);
scene.add(points2);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(9, 9, 9);
camera.lookAt(0, -1.0, 0);
renderer.render(scene, camera);
