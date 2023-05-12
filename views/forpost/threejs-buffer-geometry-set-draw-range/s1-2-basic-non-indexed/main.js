// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry_source = new THREE.SphereGeometry(1, 30, 30);
const geometry = geometry_source.toNonIndexed();
const att_pos = geometry.getAttribute('position');
const start = Math.round( att_pos.count * 0.50);
const count = Math.round( att_pos.count * 0.10);
geometry.setDrawRange(start, count );

console.log(att_pos.count);       // 5220
console.log(geometry.index);      // null
console.log(geometry.drawRange);  // {start: 2610, count: 522}

// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial( {side: THREE.DoubleSide } ));
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
