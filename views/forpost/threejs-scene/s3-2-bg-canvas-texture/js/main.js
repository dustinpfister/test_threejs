//-------- ----------
// SCENE OBJECT - CREATING A TEXTURE WITH CANVAS
//-------- ----------
const scene = new THREE.Scene();
//-------- ----------
// CREATE CANVAS, GET CONTEXT, SET SIZE
//-------- ----------
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 512;  // width and height need to be powers of two
canvas.height = 256;
//-------- ----------
// DRAW TO CANVAS USING 2D DRAWING CONTEXT
//-------- ----------
ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = 'white';
ctx.strokeStyle = 'red';
ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(256, 128, 100, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
//-------- ----------
// CREATE TEXTURE FROM CANVAS, AND SET TO scene.background
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
//texture.offset = new THREE.Vector2(0, 0); // can adjust offset
scene.background = texture;
//-------- ----------
// ADJUSTING TEXTURE OFFSET AND REPEAT
//-------- ----------
// scaling background image to fit, without stretching it
// https://stackoverflow.com/questions/52624261/three-js-scaling-background-image-to-fit-window-without-stretching-it
const targetAspect = 640 / 480;
const imageAspect = 512 / 256;
const factor = imageAspect / targetAspect;
// When factor larger than 1, that means texture 'wilder' than target。 
// we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
scene.background.repeat.y = factor > 1 ? 1 : factor;
//-------- ----------
// CAMERA, RENDERER, MESH
//-------- ----------
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 100);
camera.position.set(2, 2, 2); 
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), new THREE.MeshNormalMaterial());
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10))
renderer.render(scene, camera);
