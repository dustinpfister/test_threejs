//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// get an px index if x and y are known
const getIndex = (grid, vx, y) => {
    const px = THREE.MathUtils.euclideanModulo(vx, grid.w);
    const py = THREE.MathUtils.euclideanModulo(y, grid.w);
    const index = py * grid.w + px;
    return index;
};
// get Vector2 if index is known but not x and y
const getVector2 = (grid, i) => {
    let pi = THREE.MathUtils.euclideanModulo(i, grid.pxData.length);
    let pX = pi % grid.w;
    let pY = Math.floor(pi / grid.w);
    let v2 = new THREE.Vector2(pX, pY);
    return v2;
};
// create a remaped grid
const createRemapedGrid = (grid1, r1) => {
    r1 = r1 === undefined ? Math.floor(grid1.w / 4) : r1;
    const hw = grid1.w / 2;
    const vHalf = new THREE.Vector2(hw - 0.5, hw - 0.5);  //!!! May have to adjust this between even and odd
    const mDist = vHalf.distanceTo( new THREE.Vector2(0, 0) );
    const grid2 = {
        w: grid1.w,
        pxData: grid1.pxData.map((currentColorIndex, i) => {
            const v2 = getVector2(grid1, i);
            const dist = v2.distanceTo( vHalf );
            // dist alpha value, and angle to center
            const dAlpha = dist / mDist;
            const a = Math.atan2(v2.y - vHalf.y, v2.x - vHalf.x) + Math.PI;
            // get another color index from closer to center
            const x = v2.x + Math.round(Math.cos(a) * r1 * (1 - dAlpha));
            const y = v2.y + Math.round(Math.sin(a) * r1 * (1 - dAlpha));
            const refIndex = getIndex(grid1, x, y);
            //console.log(i, a.toFixed(2), refIndex);
            //return currentColorIndex;
            return grid1.pxData[refIndex];
         }),
        pal: grid1.pal
    };
    return grid2;
};
// get a canvas texture from the given grid
const getTextureFromGrid = (grid, canvasSize) => {
    canvasSize = canvasSize === undefined ? 64 : canvasSize;
    return canvasTextureMod.createCanvasTexture((ctx, canvas) => {
        ctx.fillStyle='white';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        let i = 0, len = grid.pxData.length;
        while(i < len){
            let pX = i % grid.w;
            let pY = Math.floor(i / grid.w);
            let c = grid.pal[ grid.pxData[i] ];
            let color = new THREE.Color(c[0], c[1], c[2]);
            ctx.fillStyle = color.getStyle();
            let pxW = canvas.width / grid.w;
            let pxH = canvas.height / grid.w;
            ctx.fillRect(pX * pxW, pY * pxH, pxW, pxH);
            i += 1;
        }
    }, canvasSize);
};
//-------- ----------
// GRID AND RE MAPED GRID
//-------- ----------
const grid1 = {
    w: 32,
    pxData: [
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
        0,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,
        0,0,0,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,
        0,0,0,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,3,0,0,0,
        0,0,0,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,3,0,0,0,
        0,0,0,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,0,1,0,0,0,0,1,0,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,0,0,1,0,0,1,0,0,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,0,0,1,0,0,1,0,0,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,0,1,0,0,0,0,1,0,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,0,0,
        0,0,0,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,3,0,0,0,
        0,0,0,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,3,0,0,0,
        0,0,0,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,
        0,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,
        0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
        0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    ],
    pal: [ [1,1,1], [0,0,0], [1,0,0], [0,1,0] ]
};
//-------- ----------
// SPHERE
//-------- ----------
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(7, 30, 30), 
    new THREE.MeshBasicMaterial({
    }) 
);
scene.add(sphere);
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const alpha = frame / frameMax;
    const b = 1 - Math.abs(0.5 - alpha) / 0.5;
    const r1 = 16 * b;
    const grid2 = createRemapedGrid(grid1, r1);
    //-------- ----------
    // BACKGROUND
    //-------- ----------
    const texture =  getTextureFromGrid(grid2, 512);
    // same texture for all sides
    cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture.image));
    cubeTexture.needsUpdate = true;
    scene.background = cubeTexture;
    // sphere evn map
    sphere.material.envMap = texture;
};
// loop
 camera.position.set(14, 6, 14);
camera.lookAt(0, 0, 0);
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        controls.update();
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();

