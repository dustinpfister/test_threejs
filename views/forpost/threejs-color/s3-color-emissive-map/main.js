//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const createCanvasTexture = function (draw) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
//-------- ----------
// TETURES
//-------- ----------
const COLOR_EMISSIVE_MAP_FRONT = new THREE.Color(1, 1, 1);
const texture = createCanvasTexture(function (ctx, canvas) {
    ctx.strokeStyle = COLOR_EMISSIVE_MAP_FRONT.getStyle();
    ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
});
//-------- ----------
// OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(0, 1, 0),
            emissiveIntensity: 0.75,
            emissive: new THREE.Color(1, 0.5, 0),
            emissiveMap: texture
        }));
scene.add(mesh1);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
