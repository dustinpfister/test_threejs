// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
//  TEXTURE
// ---------- ----------
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 8;
canvas.height = 8;
ctx.fillStyle = 'lime';
ctx.fillRect(0,0, 8, 8);
ctx.fillStyle = 'black';
ctx.fillRect(1,1,1,1);
ctx.fillRect(6,6,1,1);
ctx.fillRect(1,6,1,1);
ctx.fillRect(6,1,1,1);
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
// ---------- ----------
//  MATERIAL, GEOMETRY, MESH
// ---------- ----------
const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.BoxGeometry();
const mesh_source = new THREE.Mesh( geometry, material );
const mesh_json = JSON.stringify( mesh_source.toJSON() );
console.log(mesh_json);

const obj = JSON.parse( mesh_json );
const loader = new THREE.ObjectLoader();
const mesh = loader.parse( obj );
scene.add(mesh);

// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
