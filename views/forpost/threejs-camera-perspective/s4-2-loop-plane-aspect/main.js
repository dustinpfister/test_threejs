//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.05, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
//-------- ----------
// GRID
//-------- ----------
const grid = new THREE.GridHelper(30, 30);
scene.add(grid);
//-------- ----------
// TEXTURE
//-------- ----------
const texture_map = createCanvasTexture( (ctx, canvas ) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'cyan';
    ctx.fillRect(64 - 32, 64, 64, 64);
}, 128);
const texture_alpha = createCanvasTexture( (ctx, canvas ) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = '#888888';
    ctx.fillRect(64 - 32, 64, 64, 64);
}, 128);
//-------- ----------
// MESH
//-------- ----------
const material_plane = new THREE.MeshBasicMaterial({
    map: texture_map, 
    alphaMap: texture_alpha,
    transparent: true
});
const geometry_plane = new THREE.PlaneGeometry(1, 1, 1, 1);
const mesh_plane_1 = new THREE.Mesh(geometry_plane, material_plane);
mesh_plane_1.scale.set(
   camera.aspect,
   1,
   1
);
const group = new THREE.Group();
group.add(mesh_plane_1);
group.add(camera);
scene.add(group);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set( 0, 0, 10 );
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;

    mesh_plane_1.position.z = 8.9 - a2 * 8.9;
    group.position.y = 1;
    group.position.z = 10 - 20 * a2;
    group.rotation.y = Math.PI / 180 * 45 * a2;
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
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
