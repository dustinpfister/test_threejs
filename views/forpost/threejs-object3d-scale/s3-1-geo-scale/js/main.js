// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(7,7,7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
// a 'source geometry'
const geo_source = new THREE.BoxGeometry(0.5, 2, 0.5);
// making a new geometry by cloning the source, and then
// scaling the geometry once
const geo = geo_source.clone();
geo.scale(4, 3, 2);
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
mesh1.position.y = 3;
scene.add(mesh1);
// ---------- ----------
// GET SIZE
// ---------- ----------
mesh1.geometry.computeBoundingBox();
const size = new THREE.Vector3();
mesh1.geometry.boundingBox.getSize(size);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs( 0.5 - a1) / 0.5;
    const yScale = 1 - 0.8 * a2;
    mesh1.scale.set(1, yScale, 1);
    mesh1.position.y = size.y / 2 * yScale;
    camera.lookAt(mesh1.position);
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