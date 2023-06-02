//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const createCanvasTexture = function (draw) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    draw(ctx, canvas);
    return {
        texture: new THREE.CanvasTexture(canvas),
        canvas: canvas,
        ctx: ctx
    };
};
const draw = function (ctx, canvas, x, y, color) {
    x = x === undefined ? 1 : x;
    y = y === undefined ? 1 : y;
    color = color === undefined ? new THREE.Color(1.0, 1.0, 0.0) : color;
    ctx.lineWidth = 1;
    ctx.fillStyle = new THREE.Color(1.0, 1.0, 1.0).getStyle();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color.getStyle();
    ctx.strokeRect(x, y, canvas.width - ( x * 2 ), canvas.height - ( y * 2));
};
const createNormalMapCube = function(canvasObj){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            normalMap: canvasObj.texture
        }));
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// mesh
const canvasObj = createCanvasTexture(draw);
const mesh1 = createNormalMapCube(canvasObj);
scene.add(mesh1);
// light
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
pl.position.set(8, 6, 2);
scene.add(pl);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
// camera, render
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
// UPDATE
const update = function(secs, per, bias, frame, maxFrame){
    const a = 1 + Math.round(15 * bias),
    color = new THREE.Color(1.0, bias, 0.0);
    draw(canvasObj.ctx, canvasObj.canvas, a, a, color);
    canvasObj.texture.needsUpdate = true;
    renderer.render(scene, camera);
};
// LOOP
const fps = 30,
maxFrame = 90;
let lt = new Date(),
frame = 0;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        update(secs, per, bias, frame, maxFrame);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
