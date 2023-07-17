//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT for gradientMap used in toon material
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 64; canvas.height = 64;
const s = 8;
const len = s * s;
const ps = canvas.width / s;
let i = 0;
while( i < len ){
    const x = i % s;
    const y = Math.floor( i / s );
    let gValue = ( x / s + y / s ) / 2;
    ctx.fillStyle = new THREE.Color( gValue, gValue, gValue).getStyle();
    ctx.fillRect(x * ps, y * ps, ps, ps);
    i += 1;
}
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// INSTANCE OF THE TOON MATERIAL
//-------- ----------
const material = new THREE.MeshToonMaterial({ color: 0xff0000, gradientMap: texture });
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
