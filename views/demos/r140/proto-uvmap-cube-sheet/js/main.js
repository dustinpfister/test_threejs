//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(2, 3, 3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//  CANVAS, TEXTURE
//-------- ----------
const CANVAS_SIZE = 128;
const CANVAS_CELLSIZE = 32;
const CELL_COUNT = Math.floor( CANVAS_SIZE / CANVAS_CELLSIZE );
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// draw to canvas
let y = 0, x = 0, i = 0;
const colors = ['red','lime', 'blue', 'pink', 'orange', 'yellow', 'white', 'black'];
while(y < CELL_COUNT){
    x = 0;
    while(x < CELL_COUNT){
        i = y * CELL_COUNT + x;
        console.log( i, x, y );
        const px = x * CANVAS_CELLSIZE;
        const py = y * CANVAS_CELLSIZE;
        ctx.fillStyle = colors[i] || 'white'
        ctx.fillRect(px, py, CANVAS_CELLSIZE, CANVAS_CELLSIZE)
        x += 1;
    }
    y += 1;
}
const texture = new THREE.CanvasTexture(canvas);
//-------- ----------
//  CUBE
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
    emissive: new THREE.Color(),
    emissiveMap: texture
});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);