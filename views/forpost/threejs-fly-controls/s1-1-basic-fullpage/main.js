//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 1, 100);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
const container = ( document.getElementById('demo') || document.body );
container.appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const appendDebugCanvas = (parent) => {
    const canvas = document.createElement('canvas');
    canvas.width = parent.width;
    canvas.height = parent.height;
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    parent.parentNode.insertBefore(canvas, parent);
    return canvas;
};
const drawDebugInfo = (canvas, ctx, camera, fc) => {
    // clear and draw black overlay
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    // text style
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    // draw camera position object into
    const v = camera.position;
    const cx = v.x.toFixed(2);
    const cy = v.y.toFixed(2);
    const cz = v.z.toFixed(2);
    ctx.fillText('campos: ' + cx + ', '  + cy + ', ' + cz, 10, 10);
    // draw yaw flight control movement
    const yl = fc.moveState.yawLeft.toFixed(2);
    const yr = fc.moveState.yawRight.toFixed(2);
    ctx.fillText('yaw: ' + yl + ' left, ' + yr + ' right', 10, 25);
    // pitch
    const pd = fc.moveState.pitchDown.toFixed(2);
    const pu = fc.moveState.pitchUp.toFixed(2);
    ctx.fillText('pitch: ' + pu + ' up, ' + pd + ' down', 10, 40);
};
//-------- ----------
// DEBUG CANVAS
//-------- ----------
// debug canvas
const canvas_debug = appendDebugCanvas(renderer.domElement);
const ctx_debug = canvas_debug.getContext('2d');
//-------- ----------
// FULL PAGE
//-------- ----------
const style1 = container.style;
style1.zIndex = 3;
style1.position = 'absolute';
style1.top = '0px';
style1.left = '0px';
style1.width = '100%';
style1.height = '100%';
const style2 = renderer.domElement.style;
style2.width = '100%';
style2.height = '100%';
const style3 = canvas_debug.style;
style3.width = '100%';
style3.height = '100%';
//-------- ----------
// MESH
//-------- ----------
const groundBox = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshDepthMaterial());
groundBox.position.set(0, -1, 0);
scene.add(groundBox);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// FLY CONTROLS
//-------- ----------

// With FLY CONTROLS the camera is given as the first argument, and
// the DOM element must now be given as a second argument for this example
// I am giving the debug cnavas
const flyControls = new THREE.FlyControls(camera, canvas_debug);
console.log(flyControls);
flyControls.dragToLook = true;
flyControls.movementSpeed = 3;
flyControls.rollSpeed = Math.PI / 24;
flyControls.autoForward = false;
// draw debug into for first time
drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);
// change event
flyControls.addEventListener('change', (evnt) => {
    drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);
});
//-------- ----------
// WINDOW EVENTS
//-------- ----------
// supress up and down
const supressKeys = (evnt) => {
    if(evnt.key === 'ArrowUp' || evnt.key === 'ArrowDown'){
        evnt.preventDefault();
    }
};
window.addEventListener('keyup', supressKeys);
window.addEventListener('keydown', supressKeys);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    requestAnimationFrame(loop);
    // UPDATE CONTROLS
    flyControls.update(secs);
    renderer.render(scene, camera);
};
loop();
