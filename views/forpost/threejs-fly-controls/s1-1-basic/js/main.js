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
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
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
const drawDebugInfo = (canvas, ctx, camera, flyControls) => {
    // clear and draw black overlay
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    // text style
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    // draw camera object into
    const v = camera.position;
    ctx.fillText('campos: ' + v.x.toFixed(2) + ', '  + v.y.toFixed(2) + ', ' +  + v.z.toFixed(2), 10, 10);
};
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
// debug canvas
const canvas_debug = appendDebugCanvas(renderer.domElement);
const ctx_debug = canvas_debug.getContext('2d');

drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);

// With FLY CONTROLS the camera is given as the first argument, and
// the DOM element must now be given as a second argument
var flyControls = new THREE.FlyControls(camera, canvas_debug);

flyControls.addEventListener('change', (evnt) => {
    //console.log( camera.position.z );
    drawDebugInfo(canvas_debug, ctx_debug, camera, flyControls);
});


//flyControls.dragToLook = true;
//flyControls.movementSpeed = 3;
//flyControls.rollSpeed = 1;
//-------- ----------
// LOOP
//-------- ----------

var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    requestAnimationFrame(loop);
    // UPDATE CONTROLS
    flyControls.update(secs);
    renderer.render(scene, camera);
};

loop();

