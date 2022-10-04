// scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Using the distanceTo method of the Vector2 class
const width = 16, height = 16;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4,
    x = i % width,
    y = Math.floor(i / width),
    v2 = new THREE.Vector2(x, y),
    d = v2.distanceTo( new THREE.Vector2(width / 2, height / 2) ),
    iPer = i / size;
    let dPer = d / (width / 2);
    dPer = dPer > 1 ? 1 : dPer;
    // set r, g, b, and alpha data values
    data[ stride ] = 255 - Math.floor(255 * dPer);
    data[ stride + 1 ] = Math.floor(64 * iPer);
    data[ stride + 2 ] = 64 - Math.floor(64 * iPer);
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
