//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh1);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(-5, 0, -5);
const vControl = new THREE.Vector3(0, 5, 5);
const curve_pos = new THREE.QuadraticBezierCurve3( v1, vControl, v2);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
lt = new Date(),
frame = 0;
const fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30,       // fps rate to move camera
frameMax = 300;
// update function
const update = () => {
    // alpha values
    const a1 = frame / frameMax;
    const a2 = (1 - Math.abs(0.5 - a1) / 0.5);
    // USING THE getPoint METHOD OF THE CURVE CLASS TO
    // GET A Vector3 OBJECT ALONG A CURVE THAT CAN THEN BE USED TO
    // SET THE POSITION OF THE CAMERA
    camera.position.copy( curve_pos.getPoint(a2) );
    camera.lookAt(mesh1.position)
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        // MOVING THE CAMERA IN THE LOOP
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
