//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// TEXTURE
//-------- ----------
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
const width = 32, height = 32;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4,
    a1 = i / size,
    a2 = i % width / width;
    // set r, g, b, and alpha data values
    data[ stride ] = Math.floor(255 * a1);            // red
    data[ stride + 1 ] = 255 - Math.floor(255 * a1);  // green
    data[ stride + 2 ] = Math.floor(255 * a2);        // blue
    data[ stride + 3 ] = 255;                         // alpha
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
//-------- ----------
// MESH
//-------- ----------
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    })
);
scene.add(plane);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
