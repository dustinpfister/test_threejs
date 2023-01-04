// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(-0.5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const draw_tri = function(ctx, canvas){
    const w = 5;
    const hw = w / 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = w;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(hw, hw);
    ctx.lineTo(canvas.width - w, hw);
    ctx.lineTo(hw, canvas.height - w);
    ctx.lineTo(hw, hw);
    ctx.stroke();
};
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 1.5,-1.5, 0.0),
    new THREE.Vector3(-1.5,-1.5, 0.0),
    new THREE.Vector3( 0.0, 1.5, 0.0),
    new THREE.Vector3( 0.0, 0.0,-6.0),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
// geo one with index using only 4 points
const geo_source = new THREE.BufferGeometry();
geo_source.setFromPoints(points);
geo_source.setIndex([ 2,1,0, 0,1,3, 1,2,3, 2,0,3 ]);
// non indexd geo from an indexed one
const geo = geo_source.toNonIndexed();
geo.computeVertexNormals();
// uv attribute
const pos = geo.getAttribute('position');
let i = 0;
const uv = [
    1,1,
    0,1,
    0,0,
    1,1,
    0,1,
    0,0,
    1,1,
    0,1,
    0,0,
    1,1,
    0,1,
    0,0
];
/*
while(i < pos.count){
   const faceIndex = Math.floor(i / 3);
   uv.push(0,1);
   i += 1;
}
*/
geo.setAttribute('uv', new THREE.BufferAttribute( new Float32Array(uv), 2 ))
console.log(geo)
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.2,1,0.1)
scene.add(dl);
//-------- ----------
// TEXTURE
//-------- ----------
const texture = createCanvasTexture(draw_tri, 64);
// ---------- ----------
// Mesh, MeshPhongMaterial
// ---------- ----------
const material = new THREE.MeshPhongMaterial({map: texture});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
//const box = new THREE.Mesh( new THREE.BoxGeometry(2,2,2), material );
//scene.add(box);

// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

