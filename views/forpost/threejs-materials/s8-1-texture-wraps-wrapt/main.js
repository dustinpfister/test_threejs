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
// USING THREE.RepeatWrapping OVER THE DEFAULT VALUE OF
// THREE.ClampToEdgeWrapping FOR wrapS and WrapT
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
const att_uv = geo.getAttribute('uv');
console.log( att_uv.array );
att_uv.setXY(0, -0.25,  1.25);
att_uv.setXY(1,  0.25,  1.25);
att_uv.setXY(2, -0.25,  0.75);
att_uv.setXY(3,  0.25,  0.75);
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
renderer.render(scene, camera);
