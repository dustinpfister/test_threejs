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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const att_pos = geometry.getAttribute('position');
console.log(att_pos.count) // 24
let i = 0;
while(i < att_pos.count){
    const a1 = i / att_pos.count;
    const x2 = -10 + 20 * a1;
    att_pos.setX(i, x2);
    i += 1;
}
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5}));
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 8, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

