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
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
}, 64);
//-------- ----------
// MESH, LIGHT
//-------- ----------
// creating a box with the standard material
const box = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshStandardMaterial({
            map: colorMap
        }));
// add the box mesh to the scene
scene.add(box);
// adding a light source
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
radian = 0;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    requestAnimationFrame(loop);
    radian += 1.57 * secs;
    radian %= Math.PI * 2;
    const x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
    renderer.render(scene, camera);
};
loop();