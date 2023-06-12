// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
canvas_2d.style = 'block';
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// TEXTURE
// ---------- ----------
const canvas_texture = document.createElement('canvas');
const ctx_texture = canvas_texture.getContext('2d');
canvas_texture.height = canvas_texture.width = 32;
const gradient = ctx_texture.createLinearGradient(0, 32, 32, 0);
gradient.addColorStop(0.00, 'red');
gradient.addColorStop(0.40, 'yellow');
gradient.addColorStop(0.50, 'lime');
gradient.addColorStop(0.60, 'cyan');
gradient.addColorStop(1.00, 'blue');
ctx_texture.fillStyle = gradient;
ctx_texture.fillRect(0,0, 32, 32);
const texture = new THREE.CanvasTexture(canvas_texture);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
// position
const data_pos = [ -1,-1,0,  -1,1,0,  1,-1,0];
geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array(data_pos), 3) );
// normal
geometry.computeVertexNormals();
// uv
const data_uv = [
  0.20,0.90,
  0.95,0.90,
  0.01,0.01
];
geometry.setAttribute('uv', new THREE.BufferAttribute( new Float32Array(data_uv), 2) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid
const grid = new THREE.GridHelper( 10,10 );
grid.material.linewidth = 3;
scene.add( grid );
// mesh1
const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map:texture });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// MINIMAP
// ---------- ----------
const minimap = {
   pos: new THREE.Vector2( 370, 10 ),
   size: 256,
   v2array: []
};
// create the v2 array for the minimap based on the given geometry
const setV2array = (minimap, geometry) => {
    const att_uv = geometry.getAttribute('uv');
    const v2array = [];
    let i = 0;
    const len = att_uv.count;
    while(i < len){
        v2array.push( new THREE.Vector2( att_uv.getX(i), 1 - att_uv.getY(i) ) );
        i += 1;
    }
    minimap.v2array = v2array;
};
// get a vector2 from the v2 array that is scaled based on size
const getMiniMapV2 = (minimap, i) => {
    return minimap.v2array[i].clone().multiplyScalar(minimap.size);
};
const drawMinimap = (minimap, ctx) => {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.translate(minimap.pos.x, minimap.pos.y);
    ctx.drawImage(canvas_texture, 0, 0, minimap.size, minimap.size);
    let i = 0;
    const len = minimap.v2array.length;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'rgba(0,255,255, 0.2)';
    ctx.lineWidth = 2;
    while(i < len){
        const v1 = getMiniMapV2(minimap, i);
        const v2 = getMiniMapV2(minimap, i + 1);
        const v3 = getMiniMapV2(minimap, i + 2);
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        i += 3;
    }
    ctx.restore();
};
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new OrbitControls(camera, canvas_2d);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------

camera.position.set(1, 1, 2);
camera.lookAt(0.4,0.1,0);
const sm = {
   FPS_UPDATE: 30,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,   // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 450,
   secs: 0,
   frame_frac: 0,      // 30.888 / 450
   frame: 0,           // 30 / 450
   tick: 0,            //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a_frame = sm.frame / sm.FRAME_MAX;

    const att_uv = geometry.getAttribute('uv');

    const radian_start = Math.PI * 2 * a_frame;
    const radius = 0.5;
    const center = new THREE.Vector2(0.5, 0.5);
    let i = 0;
    while(i < att_uv.count){
        const a_count = (i / att_uv.count);
        const radian = (radian_start + Math.PI * 2 * a_count) % Math.PI * 2;
        const v = new THREE.Vector2();
        v.x = center.x + Math.cos(radian) * radius;
        v.y = center.y + Math.sin(radian) * radius;
        att_uv.setXY(i, v.x, v.y);
        i += 1;
    }
    att_uv.needsUpdate = true;

    //att_uv.setXY(0, 0, 1);
    //att_uv.setXY(1, 0, 1);
    //att_uv.setXY(2, 0, 1);

    setV2array(minimap, geometry);

};
const render2d = (sm) => {
    // background
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // draw dom element
    ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
    // draw uv minimap
    drawMinimap(minimap, ctx)
    // text overlay
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('frame : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 5);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
