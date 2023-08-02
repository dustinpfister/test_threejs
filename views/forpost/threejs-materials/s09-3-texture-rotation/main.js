//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELEPRS
//-------- ----------
const setUVRotation = ( geo, c = new THREE.Vector2(0.5, 0.5), radius = 0.75, a_start = Math.PI * 1.75, order = 'XZ' ) => {
    const att_uv = geo.getAttribute('uv');
    const att_pos = geo.getAttribute('position');
    let i = 0;
    while( i < att_uv.count ){
        const a = a_start + Math.atan2( att_pos[ 'get' + order[0] ](i), att_pos[ 'get' + order[1] ](i) );
        const u = c.x + Math.cos(a) * radius;
        const v = c.y + Math.sin(a) * radius;
        att_uv.setXY( i, u, v );
        i += 1;
   }
   att_uv.needsUpdate = true;
};
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT, TEXTURE - Whole Bunch of cells
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1024; canvas.height = 1024;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const w = 2;
const wp = canvas.width / w;
const len = w * w;
let i = 0;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '500px arial';
ctx.lineWidth = 8;
while( i  < len ){
    const a_cell = i / len;
    const x = i % w;
    const y = Math.floor( i / w );
    ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
    ctx.fillRect(x * wp, y * wp, wp, wp);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#8f8f8f';
    ctx.fillText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    ctx.strokeText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
geo.rotateX( Math.PI * 1.5 );
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geo, material );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set( 1.7, 1.2, 1.7 );
camera.lookAt( 0, -0.5, 0 );
const sm = {
   FPS_UPDATE: 12,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date(),
   c: new THREE.Vector2(0.5, 0.5),
   radius: 0.8,
   a_start: 0
};
const update = function(sm){
    const a_frame = sm.frame / sm.FRAME_MAX;
    const a_rotation = a_frame * 16 % 1;
    const a_radius = (1 + Math.sin( Math.PI * 2 * (a_frame * 4 % 1) ) ) / 2
    sm.a_start = Math.PI * 2 * a_rotation;
    sm.radius = 0.5 + 1.75 * a_radius;
    setUVRotation(geo, sm.c, sm.radius, sm.a_start);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
