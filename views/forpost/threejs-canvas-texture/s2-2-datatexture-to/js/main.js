//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.75, 0.75, 1.5);
camera.lookAt(0, -0.2, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
canvas.width = 32;
canvas.height = 32;
// white background
ctx.fillStyle = 'white';
ctx.fillRect(0,0, canvas.width, canvas.height);
// draw box line around edge
ctx.strokeStyle = 'black';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.rect(2, 2, 32 - 4, 32 - 4);
ctx.stroke();
const texture_canvas = new THREE.CanvasTexture(canvas);
//-------- ----------
// DATA TEXTURE FROM CANVAS 2D CONTEXT
//-------- ----------
const canvasData = texture_canvas.image.getContext('2d').getImageData(0, 0, 32, 32);
const texture_data = new THREE.DataTexture(canvasData.data, 32, 32 );
// Can do somehting to the data like add noise
const data = texture_data.image.data;
let i = 0, len = data.length;
while(i < len){
    let delta = -200 + 300 * Math.random();
    data[i + 0] = data[i + 0] + delta;
    data[i + 1] = data[i + 1] + delta;
    data[i + 2] = data[i + 2] + delta;
    i += 4;
};
texture_data.needsUpdate = true;
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_data
    })
);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
