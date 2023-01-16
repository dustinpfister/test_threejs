//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
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
// CURVE TO MOVE CAMERA ALONG
//-------- ----------
const curve_campos = curveMod.QBCurvePath([ [5, 2, 5, -5, -2, -4,    0, -5, 10,      100] ]);
//-------- ----------
// GET ALPHA FUNCTION USING curve2
//-------- ----------
const get_alpha_curve2 = curveMod.getAlphaFunction({
    type: 'curve2',
    ac_points: [0, -0.2, 0.35, 0.2, 0.55, -0.5, 1]
})
scene.add( curveMod.debugAlphaFunction(get_alpha_curve2) )
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
     const a1 = frame / frameMax;
     const a2 = get_alpha_curve2(a1);
     // using a curve created with curves.js, and also a 
     // get alpha function created with curves.js
     camera.position.copy( curve_campos.getPoint(a2) );
     camera.lookAt(0,0,0)
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
