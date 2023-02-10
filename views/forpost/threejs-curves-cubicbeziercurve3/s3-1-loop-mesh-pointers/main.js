// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MESH POINTERS
// ---------- ----------
const geo_pointer = new THREE.SphereGeometry(0.5, 20, 20);
const material_pointer = new THREE.MeshNormalMaterial();
const mesh_start = new THREE.Mesh(geo_pointer, material_pointer);
const mesh_end = new THREE.Mesh(geo_pointer, material_pointer);
const mesh_c1 = new THREE.Mesh(geo_pointer, material_pointer);
const mesh_c2 = new THREE.Mesh(geo_pointer, material_pointer);
scene.add(mesh_start);
scene.add(mesh_end);
scene.add(mesh_c1);
scene.add(mesh_c2);
// ---------- ----------
// MESH GROUP
// ---------- ----------
const material_child = new THREE.MeshBasicMaterial({ color: new THREE.Color(1,0,0)});
const geometry_child = new THREE.SphereGeometry(0.25, 20, 20);
const group = new THREE.Group();
let i = 0; const len = 14;
while(i < len){
    const mesh = new THREE.Mesh(geometry_child, material_child);
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// CURVE
// ---------- ----------
const curve = new THREE.CubicBezierCurve3(mesh_start.position, mesh_c1.position, mesh_c2.position, mesh_end.position);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    mesh_start.position.set(0,0,5);
    mesh_end.position.set(0,0,-5);
    mesh_c1.position.set(-5 + 10 * a2,0,2.5);
    mesh_c2.position.set(5 - 10 * a2,0,-2.5);
    group.children.forEach( (mesh, i, arr) => {
        const a4 = (i + 1) / (arr.length + 1);
        mesh.position.copy( curve.getPoint(a4) );
    });
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

