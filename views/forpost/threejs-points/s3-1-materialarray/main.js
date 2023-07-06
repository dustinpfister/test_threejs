// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BoxGeometry(6, 6, 6, 8, 8, 8);
// ---------- ----------
// MATERIAL
// ---------- ----------
const materials = [
    new THREE.PointsMaterial( { color: 0xff0000, size: 0.4 } ),
    new THREE.PointsMaterial( { color: 0xffffff, size: 0.8 } ),
    new THREE.PointsMaterial( { color: 0x0000ff, size: 0.4 } ),
    new THREE.PointsMaterial( { color: 0x888888, size: 0.8 } ),
    new THREE.PointsMaterial( { color: 0xff00ff, size: 0.4 } ),
    new THREE.PointsMaterial( { color: 0x444444, size: 0.8 } )
];
// ---------- ----------
// OBJECTS
// ---------- ----------
const points1 = new THREE.Points(geometry, materials);
scene.add(points1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 4, 8);
camera.lookAt( 0, -0.7, 0 );
renderer.render(scene, camera);

