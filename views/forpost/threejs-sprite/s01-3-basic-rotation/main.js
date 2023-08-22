// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a texture for the sprite
const createTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = 32, h = 32;
    canvas.width = w; canvas.height = h;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( 0, 0);
    ctx.lineTo( w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo( w, 0);
    ctx.lineTo( 0, h);
    ctx.stroke();
    return new THREE.CanvasTexture( canvas );
};
const createSprite = () => {
    const material = new THREE.SpriteMaterial({
        map: createTexture(),
        sizeAttenuation: true,
        depthTest: false,
        transparent: true,
        rotation: 0,
        opacity: 1
    });
    const sprite = new THREE.Sprite(  material );
    return sprite;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const sprite = createSprite();
scene.add( sprite );
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
let deg = 0;
const dps = 20;  // degrees per second
const fps = 12;  // frames per second
let lt = new Date();
const loop = () => {
    const now = new Date();
    const secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        deg += dps * secs;
        deg %= 360;
        sprite.material.rotation = Math.PI / 180 * deg;
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();