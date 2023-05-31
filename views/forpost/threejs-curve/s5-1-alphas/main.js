// ---------- ----------
// SCENE, CAMERA, RENDERER, 2DCANVAS OVERLAY
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const canvas_3d = renderer.domElement;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// HELPERS
// ---------- ----------
// create a curve alpha function
const createCurveAlphaFunc = (curve, grain = 100) => {
   const varray = curve.getPoints(grain);
   const y_array = varray.map( (v) => { return v.y });
   const y_min = Math.min.apply(null, y_array );
   const y_max = Math.max.apply(null, y_array );
   return function(n = 0, d = 1){
      const alpha = n / d;
      const v = curve.getPoint(alpha);
      const range = y_max - y_min;
      return 1 - ( Math.sqrt( Math.pow(v.y - y_max, 2) ) / range );
   };
};
// ---------- ----------
// CURVE ALPHA
// ---------- ----------
const v_start = new THREE.Vector2(0, 0);
const v_end = new THREE.Vector2(1, 1);
const curve = new THREE.LineCurve(v_start, v_end);
const getAlpha = createCurveAlphaFunc(curve);

console.log( getAlpha(0.75) );

// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// CONTROLS
// ---------- ----------
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, canvas_2d);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set( 2, 2, 2 );
camera.lookAt( 0, 0, 0 );
const sm = {
   FPS_UPDATE: 24,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 24,   // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 450,
   secs: 0,
   frame_frac: 0,      // 30.888 / 450
   frame: 0,           // 30 / 450
   tick: 0,            //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
// main update method for the scene
const update = function(sm){
    const a_frame = sm.frame / sm.FRAME_MAX;
};
// 2d render layer
const render2d = (sm) => {
    ctx.clearRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // simple text info
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('frame : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 5);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
