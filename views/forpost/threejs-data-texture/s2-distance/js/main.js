// scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Using the distanceTo method of the Vector2 class
var width = 16, height = 16;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4,
    x = i % width,
    y = Math.floor(i / width),
    v2 = new THREE.Vector2(x, y),
    d = v2.distanceTo( new THREE.Vector2(width / 2, height / 2) ),
    iPer = i / size,
    dPer = d / (width / 2);
    dPer = dPer > 1 ? 1 : dPer;
    // set r, g, b, and alpha data values
    data[ stride ] = 255 - Math.floor(255 * dPer);
    data[ stride + 1 ] = Math.floor(64 * iPer);
    data[ stride + 2 ] = 64 - Math.floor(64 * iPer);
    data[ stride + 3 ] = 255;
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
