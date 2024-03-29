//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// make a heart shape
const makeHeartShape = (b, mb, sx, sy) => {
    b = b === undefined ? 9: b;
    mb = mb === undefined ? 0.75: mb;
    sx = sx === undefined ? 2.5: sx;
    sy = sy === undefined ? 2.5: sy;
    const shape = new THREE.Shape();
    shape.moveTo( sx, sy );
    shape.bezierCurveTo( sx, sy, 2, 0, 0, 0 );
    shape.bezierCurveTo( -3, 0, -3, 3, -3.0, 3 );
    shape.bezierCurveTo( -3, 5, -1, b * mb, 2, b );
    shape.bezierCurveTo( 6, b * mb, 8, 5, 8, 3 );
    shape.bezierCurveTo( 8, 3, 8, 0, 5, 0 );
    shape.bezierCurveTo( 3, 0, sx, sy, sx, sy );
    return shape;
};
// make a heart geometry
const makeHeartGeo = (b, mb, sx, sy, extrudeSettings) => {
    const shape = makeHeartShape(b, mb, sx, sy);
    extrudeSettings = extrudeSettings || {
        depth: 1.5,
        bevelEnabled: false,
        steps: 2};
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    geometry.rotateX(Math.PI * 1);
    geometry.center();
    return geometry;
};
// update geo
const updateGeo = (geoA, geoB) => {
    const posA = geoA.getAttribute('position');
    const posB = geoB.getAttribute('position');
    posA.array = posA.array.map((n, i)=>{
        return posB.array[i];
    });
    posA.needsUpdate = true;
    geoA.computeVertexNormals();
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = makeHeartGeo();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
let s = 0.25;
mesh.scale.set(s, s, s);
// add the mesh to the scene
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a = frame / frameMax;
    const ab = 1 - Math.abs(0.5 - a) / 0.5;
    let b = 6 + 6 * ab;
    let mb = 0.75;
    let sy = 2.5 * ab;
    updateGeo(mesh.geometry, makeHeartGeo(b, mb, 2.5, sy));
    mesh.rotation.y = Math.PI * 2 * a;
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
 