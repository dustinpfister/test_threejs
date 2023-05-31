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

const getSmoothAlpha = (n = 0, d = 1) => {
    return THREE.MathUtils.smoothstep(n / d, 0, 1);
};
const getSmootherAlpha = (n = 0, d = 1) => {
    return THREE.MathUtils.smootherstep(n / d, 0, 1);
};
const getBiasAlpha = (n = 0, d = 1) => {
   const a = n / d;
   return 1 - Math.abs( 0.5 - a ) / 0.5;
};
// draw a curve graph Line with a getApha function
const drawCurveGraph = (ctx, getAlpha, a_pointer = 0.5, x = 460, y = 10, w = 160, h = 120, grain = 100, style = 'white' ) => {
    // outline, background
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = 'rgba(0,0,0, 0.5)';
    ctx.strokeStyle = style;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    // alpha line
    let i = 0;
    while(i < grain){
        const a_pt = i / ( grain - 1);
        const alpha = getAlpha( a_pt, 1 );
        const x2 = x + w * a_pt;
        const y2 = y + h - h * alpha;
        if(i === 0){
            ctx.moveTo(x2, y2);
        }
        if(i > 0){
            ctx.lineTo(x2, y2);
        }
        i += 1;
    }
    ctx.stroke();
    // draw pointer
    ctx.fillStyle = style;
    const alpha = getAlpha( a_pointer, 1 );
    const cx = x + w * a_pointer;
    const cy = y + h - h * alpha;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2, false);
    ctx.fill();
};
// ---------- ----------
// CURVE ALPHA
// ---------- ----------
const v_start = new THREE.Vector2(0, 0);
const v_end = new THREE.Vector2(1, 1);
const v_control = v_start.clone().lerp(v_end, 0.25).add( new THREE.Vector2( 0, 2 ) );
const curve = new THREE.QuadraticBezierCurve(v_start, v_control, v_end);
const getCurveAlpha = createCurveAlphaFunc(curve);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xffffff }));
mesh1.position.x = -3;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xff0000 }));
mesh2.position.x = -1;
scene.add(mesh2);
const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
mesh3.position.x = 1;
scene.add(mesh3);
const mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x0000ff }));
mesh4.position.x = 3;
scene.add(mesh4);
// light
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0,2,1)
scene.add(dl);
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
camera.position.set( 2, 7, 7 );
camera.lookAt( 2, 0, 0 );
const sm = {
   FPS_UPDATE: 24,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 24,   // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 450,
   secs: 0,
   frame_frac: 0,      // 30.888 / 450
   frame: 0,           // 30 / 450
   tick: 0,            //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date(),
   a_frame: 0
};
// main update method for the scene
const update = function(sm){
    sm.a_frame = sm.frame / sm.FRAME_MAX;

    sm.a_bias = getBiasAlpha(sm.a_frame, 1); 
    sm.a_smooth = getSmoothAlpha(sm.a_frame, 1); //getAlpha(sm.a_bias, 1);
    sm.a_smoother = getSmootherAlpha(sm.a_frame, 1);
    sm.a_curve = getCurveAlpha(sm.a_frame, 1);

    mesh1.rotation.y = Math.PI * 2 * sm.a_bias;
    mesh1.scale.set(1,1,1).multiplyScalar(sm.a_bias);
    mesh2.rotation.y = Math.PI * 2 * sm.a_smooth;
    mesh2.scale.set(1,1,1).multiplyScalar(sm.a_smooth);
    mesh3.rotation.y = Math.PI * 2 * sm.a_smoother;
    mesh3.scale.set(1,1,1).multiplyScalar(sm.a_smoother);
    mesh4.rotation.y = Math.PI * 2 * sm.a_curve;
    mesh4.scale.set(1,1,1).multiplyScalar(sm.a_curve);
};
// 2d render layer
const render2d = (sm) => {
    ctx.clearRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // draw the curve graph
    drawCurveGraph(ctx, getBiasAlpha, sm.a_frame, 460, 10, 160, 100, 100, '#ffffff');
    drawCurveGraph(ctx, getSmoothAlpha, sm.a_frame, 460, 120, 160, 100, 100, '#ff0000');
    drawCurveGraph(ctx, getSmootherAlpha, sm.a_frame, 460, 230, 160, 100, 100, '#00ff00');
    drawCurveGraph(ctx, getCurveAlpha, sm.a_frame, 460, 340, 160, 100, 100, '#0000ff');

    // simple text info
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('frame : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 5);
    ctx.fillText('a_smooth : ' + sm.a_smooth.toFixed(4), 5, 15);
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
