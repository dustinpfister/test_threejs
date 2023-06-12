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
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
// position
const data_pos = [ -1,-1,0,  -1,1,0,  1,-1,0];
geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array(data_pos), 3) );
// normal
geometry.computeVertexNormals();
// uv
const data_uv = [ 0,0, 0,1, 1,1 ];
geometry.setAttribute('uv', new THREE.BufferAttribute( new Float32Array(data_uv), 2) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid
scene.add( new THREE.GridHelper( 10,10 ) );
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-3,0,1);
scene.add(dl);
// mesh1
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
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
};
const render2d = (sm) => {
    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // draw dom element
    ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
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
