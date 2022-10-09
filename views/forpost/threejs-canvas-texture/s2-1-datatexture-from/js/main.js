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
// CANVAS TEXTURE FROM DATA TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
canvas.width = 32;
canvas.height = 32;
// white background
ctx.fillStyle = 'white';
ctx.fillRect(0,0, canvas.width, canvas.height);
// draw box line around edge
ctx.strokeStyle = 'black';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.rect(2, 2, 32 - 4, 32 - 4);
ctx.stroke();
// PUTTING IMAGE DATA FROM DATA TEXTURE
const imgData = new ImageData(texture_data.image.data, 16, 16);
ctx.putImageData(imgData, 8, 8);
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
