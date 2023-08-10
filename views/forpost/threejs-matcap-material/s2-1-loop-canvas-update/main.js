// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// update a texture
const update_texture = ( texture, v_offset = new THREE.Vector2(1, 1), intensity = 1 ) => {
    const canvas = texture.image;
    const ctx = canvas.getContext('2d');
    const r1 = canvas.width / 2;
    const x1 = r1, y1 = r1, x2 = r1 * v_offset.x, y2 = r1 * v_offset.y, r2 = r1 * ( 0.125 * intensity );
    const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'white');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0, canvas.width, canvas.height);
    texture.needsUpdate = true;
};
// create a canvas texture
const create_texture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const texture = new THREE.CanvasTexture( canvas );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    update_texture(texture);
    return texture;
};
// ---------- ----------
// MATERIAL
// ---------- ----------
const texture = create_texture();
const material = new THREE.MeshMatcapMaterial({ matcap: texture });
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry(1, 30, 30);
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20,
FPS_MOVEMENT = 30,
FRAME_MAX = 120,
CLOCK = new THREE.Clock(true);
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
const v_offset = new THREE.Vector2( 1, 1)
const update = (frame, frameMax) => {
    const a_frame = frame / frameMax;
    const a_bias = 1 - Math.abs(0.5 - a_frame ) / 0.5;
    const a_smooth = THREE.MathUtils.smoothstep(a_bias, 0, 1);
    v_offset.x = -1 + 3 * a_bias;
    update_texture(texture, v_offset, 0.25 + 1.75 * a_frame);
};
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
