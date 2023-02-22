//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a basic write frame cube
const createBasicWireCube = function (size) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        }));
};
// create a canvas texture
const createCanvasTexture = function (draw) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    draw = draw || function (ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// create a cube with a canvas as a texture
// the material is transparent and rendering is done on
// both sides.
const createCanvasWireCube = function (size) {
    const texture = createCanvasTexture();
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.8,
            map: texture,
            side: THREE.DoubleSide
        })
    );
};
//-------- ----------
// OBJECTS
//-------- ----------
const cube = createCanvasWireCube(1.75);
cube.position.set(3, 0, 0)
scene.add(cube);
scene.add(createBasicWireCube(1.75));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 2, 5);
camera.lookAt(1, 0, 0);
renderer.render(scene, camera);

