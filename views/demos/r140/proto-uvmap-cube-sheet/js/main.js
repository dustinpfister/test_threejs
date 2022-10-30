//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(2, 2, 2);
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
        ctx.fillText('(' + x + ',' + y + ')', px, py + 10);
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
// get a uvData array for a given uv face index and cell index
const getUVData = (uv, faceIndex, cellIndex, gridSize) => {
    faceIndex = faceIndex === undefined ? 0: faceIndex;
    cellIndex = cellIndex === undefined ? 0: cellIndex;
    gridSize = gridSize === undefined ? 4: gridSize;
    const cellX = cellIndex % gridSize;
    const cellY = Math.floor(cellIndex / gridSize);
    // for each set of uvs for the face
    let di = 0;
    const uvd = 1 / gridSize;
    let uvData = [];
    while(di < 4){
        const i = faceIndex * 4 + di;
        const x = di % 2;
        const y = 1 - 1 * Math.floor(di / 2);
        // get u and v using cellX and cellY
        const u = uvd * cellX + x * uvd;
        const v = 1 - uvd * ( cellY + 1 ) + y * uvd;
        uvData.push({i:i,u:u,v:v});
        di += 1;
    }
    return uvData;
};
// set uvs with the uvData, and order arrays
const setUVData = (uv, uvData, order ) => {
    order = order || [0, 1, 2, 3]; // normal
    uvData.forEach((a, di, uvData) => {
    const b = uvData[ order[di] ]
        uv.setXY(a.i, b.u, b.v);
    });
};

const uv = geo.getAttribute('uv');

setUVData(uv, getUVData(uv, 0, 0, 4) );
setUVData(uv, getUVData(uv, 1, 1, 4) );
setUVData(uv, getUVData(uv, 2, 2, 4), [3, 1, 2, 0] );
setUVData(uv, getUVData(uv, 3, 3, 4) );
setUVData(uv, getUVData(uv, 4, 4, 4), [2, 0, 3, 1] );
setUVData(uv, getUVData(uv, 5, 5, 4) );

//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);