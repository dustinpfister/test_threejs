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
const createCanvasObject = function (opt) {
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
// draw method to use with canvas object
const draw_info = (can, ctx, canvas) => {
    ctx.fillStyle = 'cyan';
    ctx.fillRect(0,0, can.size, can.size);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '19px arial'
    ctx.fillText(can.userData.mess, can.size / 2, can.size / 2);
};
// ---------- ----------
// CAN object
// ---------- ----------
const can = createCanvasObject({
    size: 128,
    draw: draw_info,
    userData: {
        mess: 'This is canvas.'
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
// RENDER
// ---------- ----------
// it is then the group that I would want to move and rotate rather than the camera
group_camera.position.set(0,1,-3);
group_camera.lookAt( 0, 0, 0 );
renderer.render(scene, group_camera.userData.camera);
