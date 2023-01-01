//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body) .appendChild(renderer.domElement);
//-------- ----------
// CANVAS, TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
// drawing gray scale areas
ctx.fillStyle = '#404040';
ctx.fillRect(0, 0, 32, 32);
ctx.fillStyle = '#808080';
ctx.fillRect(32, 0, 32, 32);
ctx.fillStyle = '#c0c0c0';
ctx.fillRect(0, 32, 32, 32);
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(32, 32, 32, 32);
const texture = new THREE.CanvasTexture(canvas);
//-------- ----------
// GEOMETRY, MESH, MATERIAL
//-------- ----------
// geometry
const geo = new THREE.BoxGeometry(1, 1, 1);
// material
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    // using the alpha map property to set the texture
    // as the alpha map for the material
    alphaMap: texture,
    // I also need to make sure the transparent
    // property is true
    transparent: true,
    // even when opacity is one the alpha map will 
    // still effect transparency this can just be used to set it even lower
    opacity: 1,
    side: THREE.DoubleSide
});
// creating a mesh
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);