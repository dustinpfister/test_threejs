//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
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
const CELL_SIZE = 4;
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
// set canvas native size
canvas.width = 128;
canvas.height = 128;
// draw to canvas
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "black");
gradient.addColorStop(1, "lime");
// Set the fill style and draw a rectangle
ctx.fillStyle = gradient;
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
    ctx.fillText(i + 1, x, y);
    i += 1;
}
// draw to cells
//-------- ---------- 
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const att_uv = geometry.getAttribute('uv');
//-------- ---------- 
// texture
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
//-------- ---------- 
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ---------- 
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    geometry,
    material
);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const ORDERS = [
   [0,1,2,3],
   [0,2,1,3],
   [2,3,0,1],
   [3,1,2,0]
];
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    mesh1.rotation.y = Math.PI * 2 * a1;
    mesh1.rotation.x = Math.PI * 8 * a1;
    if(frame % 30 === 0){
        let index_face = 0;
        while(index_face < 6){
            const index_cell = Math.floor( Math.random() * 6 );
            const order = ORDERS[ Math.floor( ORDERS.length * Math.random() ) ];
            setUVFace(att_uv, index_face, index_cell, order, CELL_SIZE);
            index_face += 1;
        }
    }
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
