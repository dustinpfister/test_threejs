// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Simple canvas object
const createCanvasObject = (opt) => {
    opt = opt || {};
    const can = {
        size: opt.size === undefined ? 32 : opt.size,
        draw: opt.draw || function(can, ctx, canvas){},
        userData: opt.userData || {},
        canvas: null, ctx: null, texture: null
    };
    can.canvas = document.createElement('canvas');
    can.ctx = can.canvas.getContext('2d');
    can.canvas.width = can.size;
    can.canvas.height = can.size;
    can.draw(can, can.ctx, can.canvas);
    can.texture = new THREE.CanvasTexture(can.canvas);
    can.texture.magFilter = THREE.NearestFilter;
    can.texture.minFilter = THREE.NearestFilter;
    return can;
};
const updateCanvasObject = (can) => {
    can.draw(can, can.ctx, can.canvas);
    can.texture.needsUpdate = true;
};
// draw method to use with canvas object
const draw_info = (can, ctx, canvas) => {
    //ctx.fillStyle = 'cyan';
    ctx.clearRect(0,0, can.size, can.size);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '19px arial';
    const ud = can.userData;
    ctx.fillText(ud.frame + ' / ' + ud.frameMax, can.size / 2, can.size / 2);
    ctx.fillRect(0,0, can.size * ud.a_vid, 5)
};
// ---------- ----------
// CAN object
// ---------- ----------
const can = createCanvasObject({
    size: 128,
    draw: draw_info,
    userData: {
        frame: 0, frameMax: 10,
        a_vid: 0.5
    }
});
// ---------- ----------
// GRID
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );
//-------- ----------
// camera group
//-------- ----------
const group_camera = cameraPlanes.create({
    planeScale: 0.9,
    camera: camera,
    zMax: 3,
    count: 1,
    effect: (group, mesh_plane, gud, mud, a_plane, alpha) => {
        const z = gud.zMax - gud.zMax * a_plane * alpha;
        mesh_plane.position.set(0, 0, z);
        mesh_plane.material.opacity = alpha * 0.75;
    }
});
// can use the getObjectByname object3d method to get a ref to a mesh
const mesh_plane = group_camera.getObjectByName('plane_0');
mesh_plane.material.map = can.texture;
scene.add(group_camera);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v1 = new THREE.Vector3(0, 3, 3);
const v2 = new THREE.Vector3(10, 1, 3);
const ud = can.userData;
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    ud.frame = frame;
    ud.frameMax = frameMax;
    ud.a_vid = a1;
    updateCanvasObject(can);
    group_camera.position.copy(v1).lerp(v2, a2);
    group_camera.lookAt( 0, 0, 5 * a2 );
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, group_camera.userData.camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
