//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
//-------- ----------
// TEXTURE
//-------- ----------
const texture_map = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'lime';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
});
const texture_emissive = createCanvasTexture(function (ctx, canvas) {
    let i = 0;
    const w = 8, h = 5, len = w * h;
    const pw = canvas.width / w;
    const ph = canvas.height / h;
    while(i < len){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = x * pw;
        const py = y * ph;
        const v = Math.random();
        const color = new THREE.Color(v, v, v);
        ctx.fillStyle =  color.getStyle();
        ctx.fillRect(px, py, pw, ph);
        i += 1;
    }
});
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
        map: texture_map,
        emissive: new THREE.Color(1,1,1),
        emissiveMap: texture_emissive,
        emissiveIntensity: 0.25
    })
);
scene.add(box);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(6, 1, 2);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
