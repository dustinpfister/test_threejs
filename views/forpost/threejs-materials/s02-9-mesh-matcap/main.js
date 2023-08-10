// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CANVAS / TEXTURE
// ---------- ----------
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const r1 = canvas.width / 2;
const x1 = r1, y1 = r1, x2 = r1 * 1.35, y2 = r1 * 1.10, r2 = r1 / 8;
const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
gradient.addColorStop(0, 'black');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
const texture = new THREE.CanvasTexture( canvas );
texture.colorSpace = THREE.SRGBColorSpace;
texture.magFilter = THREE.NearestFilter;
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshMatcapMaterial({ matcap: texture });
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry(1, 30, 30);
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
