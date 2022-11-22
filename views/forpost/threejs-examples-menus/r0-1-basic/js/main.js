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
        mud.scaleDelta = 0.25;
    }
});
// set up buttons
menu.buttons.traverse( (obj) => {
    if(obj.type === 'Mesh'){
        const button = obj;
        const mud = button.userData;
        mud.scaleDelta = 0;
        console.log(mud);
        mud.scale = 1;
    }
});
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20;
let secs = 0,
lt = new Date();
// update
const update = function(secs){
    menu.buttons.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            const button = obj;
            const mud = button.userData;
            mud.scaleDelta -= 0.5 * secs;
            mud.scaleDelta = mud.scaleDelta < 0 ? 0 : mud.scaleDelta;
            mud.scale = 1 + mud.scaleDelta;
            button.scale.set(mud.scale, mud.scale, mud.scale);
        }
    });
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( secs );
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();


