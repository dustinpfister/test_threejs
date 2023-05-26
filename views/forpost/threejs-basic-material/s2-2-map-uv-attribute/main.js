//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCITONS
//-------- ----------
// get a uvData array for a given uv face index and cell index
const getUVData = (faceIndex, cellIndex, gridSize) => {
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
    uv.needsUpdate = true;
};
// main helper
const setUVFace = (uv, faceIndex, cellIndex, order, gridSize) => {
    const uvData = getUVData(faceIndex, cellIndex, gridSize);
    setUVData(uv, uvData, order );
};
//-------- ---------- 
// CANVAS
//-------- ----------
const CELL_SIZE = 2;
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
// set canvas native size
canvas.width = 64;
canvas.height = 64;
// draw to canvas
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
let i = 0;
const len = CELL_SIZE * 2;
const cellsize = canvas.width / CELL_SIZE;
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '32px arial';
while(i < len){
    const gx = i % CELL_SIZE;
    const gy = Math.floor( i / CELL_SIZE );
    const x = cellsize * gx + cellsize / 2;
    const y = cellsize * gy + cellsize / 2;
    ctx.fillText(i, x, y);
    i += 1;
}
// draw to cells
//-------- ---------- 
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const att_uv = geometry.getAttribute('uv');
setUVFace(att_uv, 0, 0, [0,1,2,3], CELL_SIZE);
//-------- ---------- 
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    // box GEOMETRY
    geometry,
    // BASIC MATERIAL WITH A COLOR MAP
    new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(canvas)
    })
);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
