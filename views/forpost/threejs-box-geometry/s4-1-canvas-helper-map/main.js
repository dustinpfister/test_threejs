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
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
});
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_map
    })
);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
