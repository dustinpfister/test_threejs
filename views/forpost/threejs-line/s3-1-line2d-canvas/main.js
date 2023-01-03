//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(1.4, 1.4, 1.4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CANVAS
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 128;
canvas.height = 128;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#ff00ff';
ctx.lineWidth = 1;
ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
const texture = new THREE.Texture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
texture.needsUpdate = true;
//-------- ----------
// GEOMETRY, MATERIAL, MESH
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
        map: texture
    });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);