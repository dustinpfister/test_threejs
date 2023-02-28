//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
//-------- ----------
// MESH
//-------- ----------
let mesh = null;
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const degree = 360 * (frame / frameMax);
    mesh.rotation.y = THREE.MathUtils.degToRad(degree);
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
//-------- ----------
// LOADER
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
     '/json/static/box_house1_solid.json',
    // onLoad callback
    (geometry) => {
        geometry.rotateX(Math.PI * 1.5);
        // create a mesh with the geometry
        // and a material, and add it to the scene
        mesh = new THREE.Mesh(
           geometry,
            new THREE.MeshPhongMaterial({
                color: 0x00ff0000,
                emissive: 0x2a2a2a,
                side: THREE.DoubleSide
            }));
        scene.add(mesh);
        loop();
    }
);

