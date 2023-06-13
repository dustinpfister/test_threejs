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
// HELPER FUNCTIONS
// ---------- ----------
const createMiniMap = ( pos = new THREE.Vector2(), size = 256, geometry = null) => {
    const minimap = {
        pos: pos,
        size: size,
        v2array: []
    };
    if(geometry){
        setV2array(minimap, geometry);
    }
    return minimap;
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
// draw the minimap
const drawMinimap = (minimap, ctx) => {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.translate(minimap.pos.x, minimap.pos.y);
    ctx.drawImage(canvas_texture, 0, 0, minimap.size, minimap.size);
    let i = 0;
    const len = minimap.v2array.length;
    ctx.strokeStyle = 'black';
    //ctx.fillStyle = 'rgba(0,255,255, 0.025)';
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
        //ctx.fill();
        i += 3;
    }
    ctx.restore();
};
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
// SHAPE/GEOMETRY
// ---------- ----------
const UVGenerator = {
    generateTopUV: function ( geometry, vertices, indexA, indexB, indexC ) {
        return [
            new THREE.Vector2( 0.05, 0.45 ),
            new THREE.Vector2( 0.05, 0.95 ),
            new THREE.Vector2( 0.95, 0.45 ),
        ];
    },
    generateSideWallUV: function ( geometry, vertices, indexA, indexB, indexC, indexD ) {
        return [
           new THREE.Vector2( 0.05, 0.05 ),
           new THREE.Vector2( 0.20, 0.05 ),
           new THREE.Vector2( 0.20, 0.20 ),
           new THREE.Vector2( 0.05, 0.05 )
        ];
    }
};
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo( 0.0, -0.5);
shape.lineTo( 0.5,  0.0);
shape.lineTo( 0.0,  0.5);
shape.lineTo(-0.5,  0.0);
const geometry = new THREE.ExtrudeGeometry(shape, { UVGenerator: UVGenerator, depth: 0.3 });
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
// RENDER
// ---------- ----------
const minimap = createMiniMap( new THREE.Vector2(430, 10), 200, geometry );
camera.position.set(2, 1, 2);
camera.lookAt(0.4,0.1,0);
setV2array(minimap, geometry);
renderer.render(scene, camera);
// background
ctx.fillStyle = '#2a2a2a';
ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
// draw dom element
ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
// draw uv minimap
drawMinimap(minimap, ctx);
// text overlay
ctx.fillStyle = 'rgba(0,0,0,0.4)';
ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
ctx.fillStyle = 'white';
ctx.textBaseline = 'top';
ctx.font = '10px monospace';

