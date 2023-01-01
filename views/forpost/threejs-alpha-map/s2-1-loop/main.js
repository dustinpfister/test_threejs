//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body) .appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
const drawMethod = {};
drawMethod.grid = function (ctx, canvas, opt) {
    opt = opt || {};
    opt.w = opt.w || 4;
    opt.h = opt.h || 4;
    opt.colors = opt.colors || ['#404040', '#808080', '#c0c0c0', '#f0f0f0'];
    opt.colorI = opt.colorI || [];
    let i = 0;
    const len = opt.w * opt.h,
    sizeW = canvas.width / opt.w,
    sizeH = canvas.height / opt.h;
    while (i < len) {
        const x = i % opt.w,
        y = Math.floor(i / opt.w);
        ctx.fillStyle = typeof opt.colorI[i] === 'number' ? opt.colors[opt.colorI[i]] : opt.colors[i % opt.colors.length];
        ctx.fillRect(x * sizeW, y * sizeH, sizeW, sizeH);
        i += 1;
    }
};
const texture = new THREE.CanvasTexture(canvas);
//-------- ----------
// GEOMETRY, MESH, MATERIAL
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
// material
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    alphaMap: texture,
    transparent: true, opacity: 1,
    side: THREE.DoubleSide
});
// creating a mesh
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0,
lt = new Date();
const maxFrame = 90,
fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        const colorI = [];
        let i = 6 * 6;
        while (i--) {
            colorI.push(Math.floor(4 * Math.random()))
        }
        drawMethod.grid(ctx, canvas, {
            w: 6,
            h: 6,
            colorI: colorI
        });
        texture.needsUpdate = true;
        mesh.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
