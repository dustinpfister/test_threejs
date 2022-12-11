//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x002a2a);
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ---------- 
// ALPHA MAP CANVAS
//-------- ----------
const alphaCanvas = document.createElement('canvas'),
ctx = alphaCanvas.getContext('2d');
// set canvas native size
alphaCanvas.width = 32;
alphaCanvas.height = 32;
// draw to canvas
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, alphaCanvas.width, alphaCanvas.height);
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 3;
ctx.strokeRect(3, 3, alphaCanvas.width - 6, alphaCanvas.height - 6);
//-------- ---------- 
// MESH USING BASIC MATERIAL with an alpha map
//-------- ----------
const cube = new THREE.Mesh(
    // box GEOMETRY
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.5,
        color: 0xffffff,
        alphaMap: new THREE.CanvasTexture(alphaCanvas)
    })
);
scene.add(cube);
//-------- ---------- 
// RENDER
//-------- ----------
renderer.render(scene, camera);
