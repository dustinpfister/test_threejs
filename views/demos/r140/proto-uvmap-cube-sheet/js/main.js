//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(3, 2, 1);
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
const colors = [
    'red','lime', 'blue', 'pink', 
    'orange', 'yellow', 'green', 'purple',
    'red','lime', 'blue', 'pink', 
    'orange', 'yellow', 'green', 'purple'
    ];
while(y < CELL_COUNT){
    x = 0;
    while(x < CELL_COUNT){
        i = y * CELL_COUNT + x;
        const px = x * CANVAS_CELLSIZE;
        const py = y * CANVAS_CELLSIZE;
        ctx.fillStyle = colors[i] || 'white'
        ctx.fillRect(px, py, CANVAS_CELLSIZE, CANVAS_CELLSIZE);
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.fillText(i, px, py);
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
//  MUTATE UV ATTRIBUTE
//-------- ----------

const uv = geo.getAttribute('uv');
console.log(uv)

// whole image
//uv.setXY(0, 0, 1);
//uv.setXY(1, 1, 1);
//uv.setXY(2, 0, 0);
//uv.setXY(3, 1, 0);

const faceIndex = 0;
const cellIndex = 0;
let di = 0;


const cellX = 1;
const cellY = 1;
while(di < 4){
    const i = faceIndex * 4 + di;
	const x = di % 2;
    const y = 1 - 1 * Math.floor(di / 2);
	
	// just need to figure out how to adjust for uv
	const u = 0.25 * cellX + x * 0.25;
	const v = y;
	
	uv.setXY(i, u, v);
	di += 1;
}


// 1
//uv.setXY(0, 0.25, 1);
//uv.setXY(1, 0.5, 1);
//uv.setXY(2, 0.25, 0.75);
//uv.setXY(3, 0.5, 0.75);

//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);