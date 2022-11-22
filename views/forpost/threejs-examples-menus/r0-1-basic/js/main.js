// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.5, 100);
camera.position.set(2.75, 2.75, 2.75);
camera.lookAt(0, -0.25, 0 );
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// CREATE MENU
// ---------- ---------- ----------
var menu = menuMod.create({
    renderer: renderer,
    scene: scene,
    camera: camera,
    count: 3,
    prefix: 'menu1',
    onClick: function(menu, button, v2, mud ){
        console.log('Button ' + mud.i + ' clicked at: ' + v2.x.toFixed(2) + ', ' + v2.y.toFixed(2));
    }
});
// style buttons
/*
menu.buttons.traverse( (obj) => {
    if(obj.type === 'Mesh'){
        const button = obj;
        console.log(button.userData)
        button.material = new THREE.MeshDepthMaterial();
    }
});
*/
// ORBIT CONTROLS
//var controls = new THREE.OrbitControls(camera, renderer.domElement);

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


