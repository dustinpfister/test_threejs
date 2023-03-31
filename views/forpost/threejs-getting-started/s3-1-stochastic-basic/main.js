// ---------- ----------
// SCENE, CAMERA, RENDERER
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
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
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
// ALPHA CONTROLS
// ---------- ----------
const ac = {
    x: 420, y:20,
    h: 125, w: 200,
    items: {}
};
ac.items.speed = { desc: 'speed', a: 0.75 };
ac.items.axisx = { desc: 'axisX', a: 0.25 };
ac.items.axisz = { desc: 'axisZ', a: 0.25 };
ac.itemCount = Object.keys(ac.items).length;
// for each item method
ac.forEachItem = (forItem) => {
    const keys = Object.keys(ac.items);
    keys.forEach( (key, i, arr) => {
        const item = ac.items[key];
        forItem(item, i, arr);
    });
};
// get an item by index
ac.getItem = (i) => {
    const keys = Object.keys(ac.items);
    return ac.items[keys[i]];
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   pointer: new THREE.Vector2(),
   uidown: false,
   pointerdown: false,
   FPS_UPDATE: 20,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const degree = 360 * (20 * ac.items.speed.a) * a1;
    mesh1.rotation.x = THREE.MathUtils.degToRad( 90 * ac.items.axisx.a);
    mesh1.rotation.y = THREE.MathUtils.degToRad(degree);
    mesh1.rotation.z = THREE.MathUtils.degToRad( 90 * ac.items.axisz.a);
};
const render2d = (sm) => {
    // background
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // draw webGl renderer dom element
    ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
    // debug info
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left'
    ctx.font = '10px monospace';
    ctx.fillText('tick              : ' + sm.tick, 5, 5)
    ctx.fillText('frame_frac        : ' + sm.frame_frac.toFixed(3), 5, 20);
    ctx.fillText('frame / FRAME_MAX : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 35);
    ctx.fillText('pointer : ' + sm.pointer.x.toFixed(2) + ',' + sm.pointer.y.toFixed(2), 5, 50);
    // alpha controls
    ctx.fillStyle = 'gray';
    ctx.fillRect(ac.x, ac.y, ac.w, ac.h);
    ac.forEachItem( (item, i, arr) => {
        ctx.fillStyle = 'cyan';
        ctx.strokeStyle = '#8a8a8a';
        const h = ac.h / arr.length;
        ctx.beginPath();
        ctx.rect(ac.x, ac.y + h * i, ac.w * item.a, h);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = Math.floor(h / 2) + 'px arial'
        ctx.fillText(item.desc, ac.x + ac.w / 2, ac.y + h / 2 + h * i);
    } );
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
// ---------- ----------
// EVENTS
// ---------- ----------
const boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
const pointerEventCommon = (e) => {
    const el = e.target;
    const bx = el.getBoundingClientRect();
    // update pointer
    sm.pointer.x = e.clientX - bx.left;
    sm.pointer.y = e.clientY - bx.top;
};
canvas_2d.addEventListener('pointerdown', (e) => {
    sm.pointerdown = true;
    sm.uidown = false;
    pointerEventCommon(e);
    if( boundingBox(sm.pointer.x, sm.pointer.y, 1, 1, ac.x, ac.y, ac.w, ac.h) && sm.pointerdown){
        sm.uidown = true;
        let a_y = (sm.pointer.y - ac.y) / ac.h;
        a_y = THREE.MathUtils.clamp(a_y, 0, 0.99);
        a_x = (sm.pointer.x - ac.x) / ac.w;
        a_x = THREE.MathUtils.clamp(a_x, 0, 0.99);
        sm.i_item = Math.floor(ac.itemCount * a_y);
        ac.getItem(sm.i_item).a = a_x;
    }
    if(THREE.OrbitControls){
        controls.enabled = !sm.uidown;
    }
});
canvas_2d.addEventListener('pointermove', (e) => {
    pointerEventCommon(e);
    if(sm.uidown){
        let a_x = (sm.pointer.x - ac.x) / ac.w;
        a_x = THREE.MathUtils.clamp(a_x, 0, 0.99);
        ac.getItem(sm.i_item).a = a_x;
    }
});
canvas_2d.addEventListener('pointerup', (e) => {
    sm.pointerdown = false;
    sm.uidown = false;
    pointerEventCommon(e);
    if(THREE.OrbitControls){
        controls.enabled = true;
    }
});