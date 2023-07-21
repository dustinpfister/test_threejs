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
// CANVAS ELEMENT, 2D DRAWING CONTEXT, TEXTURE - Whole Bunch of cells
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1024; canvas.height = 1024;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const w = 8;
const wp = canvas.width / w;
const len = w * w;
let i = 0;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '100px arial';
ctx.lineWidth = 3;
while( i  < len ){
    const a_cell = (i + 5) / (len + 15);
    const x = i % w;
    const y = Math.floor( i / w );
    ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
    ctx.fillRect(x * wp, y * wp, wp, wp);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#5f5f5f';
    ctx.fillText(i, x * wp + wp / 2, y * wp + wp / 2);
    ctx.strokeText(i, x * wp + wp / 2, y * wp + wp / 2);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// MATERIAL - using basic material with the map option and the texture from canvas
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const att_uv = geo.getAttribute('uv');
const cellX = 5, cellY = 3; // cellX and cellY can be used to set the cell to draw in the texture
const cx = 1 / w * cellX;
const cy = 1 / w * cellY;
const faceIndex = 2; // the face index to use
const i2 = faceIndex * 4;
att_uv.setXY(i2,     0.000 + cx, 1.000 - cy);
att_uv.setXY(i2 + 1, 0.125 + cx, 1.000 - cy);
att_uv.setXY(i2 + 2, 0.000 + cx, 0.875 - cy);
att_uv.setXY(i2 + 3, 0.125 + cx, 0.875 - cy);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
