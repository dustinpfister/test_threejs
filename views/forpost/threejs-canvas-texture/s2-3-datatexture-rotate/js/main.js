//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// DATA TEXTURE
//-------- ----------
const width = 16, height = 16;
const size = width * height;
const data = new Uint8ClampedArray( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4, a = i / size;
    // set r, g, b, and alpha data values
    data[ stride ] = 255 * a;            // red
    data[ stride + 1 ] = 128 - 128 * a;  // green
    data[ stride + 2 ] = 0;              // blue
    data[ stride + 3 ] = 255;            // alpha
}
const texture_data = new THREE.DataTexture( data, width, height );
texture_data.needsUpdate = true;
//-------- ----------
// CANVAS_DS - canvas element from DATA TEXTURE SOURCE
//-------- ----------
const img_ds = texture_data.image;
const w_ds = img_ds.width;
const h_ds = img_ds.height;
const canvas_ds = document.createElement('canvas'),
ctx_ds = canvas_ds.getContext('2d');
canvas_ds.width = w_ds;
canvas_ds.height = h_ds;
// PUTTING IMAGE DATA FROM DATA TEXTURE
const imgData = new ImageData(img_ds.data, w_ds, h_ds);
ctx_ds.putImageData(imgData, 0, 0);
//-------- ----------
// CANVAS - final canvas texture
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 32;
canvas.height = 32;
// background
ctx.fillStyle = '#004444';
ctx.fillRect(0,0, 32, 32);
ctx.strokeStyle = '#aaaaaa';
ctx.lineWidth = 2;
ctx.strokeRect(2, 2, 28, 28);
// can now draw to this canvas with the canvas_ds canvas
// by using the drawImage method of the 2d context. As such
// I can now use methods like ctx.rotate
ctx.save();
ctx.translate(16, 16);
ctx.rotate(Math.PI / 180 * 45);
ctx.drawImage(canvas_ds, -11, -11, 22, 22);
ctx.restore();
const texture_canvas = new THREE.CanvasTexture(canvas);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_canvas
    })
);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
