//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - mutation of uv attribute data for one face
//-------- ----------
const geometry = new THREE.BoxGeometry( 1, 1, 1);
const att_uv = geometry.getAttribute('uv');
att_uv.setXY(0, 0.25, 1.00);
att_uv.setXY(1, 0.25, 0.75);
att_uv.setXY(2, 0.50, 1.00);
att_uv.setXY(3, 0.50, 0.75);
//-------- ----------
// TEXTURE
//-------- ----------
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height = 128;
document.body.appendChild(canvas);
ctx.fillStyle = 'white';
ctx.fillRect( 0, 0, canvas.width, canvas.height);
const w = 4;
const s = canvas.width / 4;
['red','lime','blue','yellow','cyan','purple'].forEach( (style, i) => {
    const gx = i % w;
    const gy = Math.floor( i / w );
    const x = gx * s;
    const y = gy * s;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, s, s);
});
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set( 1.2, 1.4, 1.2 );
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
