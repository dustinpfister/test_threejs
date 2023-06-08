//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2,0.2,0.2);
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
//-------- ----------
// TEXTURE
//-------- ----------
const colorMap = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'lime';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
}, 64);
const emmisveMap = createCanvasTexture(function (ctx, canvas) {
    const w = 8, h = 8;
    let i = 0, len = w * h;
    while(i < len){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = canvas.width / w * x;
        const py = canvas.height / h * y;

        const v = 0.50 * Math.random().toFixed(2);
        const color = new THREE.Color(v,v,v);
        ctx.fillStyle = color.getStyle();
        ctx.fillRect(px, py, canvas.width / w, canvas.width / h);
        i += 1;
    }
}, 64);
//-------- ----------
// MESH
//-------- ----------
// creating a box with the standard material
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(1,1,1),
    map: colorMap,
    emissive: new THREE.Color(1,1,1),
    emissiveIntensity: 0.25,
    emissiveMap: emmisveMap
});
const box = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    material
);
scene.add(box);
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
//-------- ----------
// LOOP
//-------- ----------
const frameMax = 300;
let lt = new Date(), frame = 0;
const loop = function () {
    const now = new Date();
    requestAnimationFrame(loop);
    // alphas
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 * 5 % 1 ) / 0.5;
    // update emissive intensity
    box.material.emissiveIntensity = a2;
    // update sun pos
    const radian = Math.PI * 2 * a1;
    const x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= frameMax;
    lt = now;
};
loop();