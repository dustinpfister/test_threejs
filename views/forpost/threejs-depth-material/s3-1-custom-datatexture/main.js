//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(2.25, 2.25, 2.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const getMeshDPer = function(mesh, camera, maxDist){
    let d1 = mesh.position.distanceTo( camera.position );
    d1 = d1 > maxDist ? maxDist : d1;
    return d1 / maxDist;
};
const createDepthData = function(mesh, camera, maxDist, width, height){
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    const d1Per = getMeshDPer(mesh, camera, maxDist);
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4,
        x = i % width,
        y = Math.floor(i / width),
        v2 = new THREE.Vector2(x, y),
        d2 = v2.distanceTo( new THREE.Vector2(width / 2, height / 2) );
        let d2Per = d2 / (width / 2);
        d2Per = d2Per > 1 ? 1 : d2Per;
        // set r, g, b, and alpha data values
        const v = 255 - Math.floor(245 * d2Per) * ( 1 - d1Per );
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    return data;
};
const createDistBox = function(camera, x, y, z, maxDist){
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
           color: 0xffffff,
           transparent: true,
           opacity: 1
        })
    );
    box.position.set(x, y, z);
    // texture
    const width = 16, height = 16;
    const data = createDepthData(box, camera, maxDist, width, height);
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    box.material.map = texture;
    // transparency
    box.material.opacity = 1 - parseFloat( getMeshDPer(box, camera, maxDist).toFixed(2) );
    return box;
};
//-------- ----------
// OBJECTS
//-------- ----------
const box1 = createDistBox(camera, 0, 0, 0, 10);
scene.add(box1);
const box2 = createDistBox(camera, -2, 0, -3.25, 10);
scene.add(box2);
const box3 = createDistBox(camera, -5.5, 0, -3.25, 10);
scene.add(box3);
const box4 = createDistBox(camera, 2.15, 1.15, 1.1, 10);
scene.add(box4);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
