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
canvas_2d.style = 'block';
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const setUVRotation = (geo, c = new THREE.Vector2(0.5, 0.5), radius = 0.75, a_start = Math.PI * 1.75, order = 'XZ') => {
    const att_uv = geo.getAttribute('uv');
    const att_pos = geo.getAttribute('position');
    let i = 0;
    while (i < att_uv.count) {
        const a = a_start + Math.atan2(att_pos['get' + order[0]](i), att_pos['get' + order[1]](i));
        const u = c.x + Math.cos(a) * radius;
        const v = c.y + Math.sin(a) * radius;
        att_uv.setXY(i, u, v);
        i += 1;
    }
    att_uv.needsUpdate = true;
};
const createMiniMap = (pos = new THREE.Vector2(), size = 256, geometry = null) => {
    const minimap = {
        pos: pos,
        size: size,
        v2array: []
    };
    if (geometry) {
        setV2array(minimap, geometry);
    }
    return minimap;
};
// create the v2 array for the minimap based on the given geometry
const setV2array = (minimap, geometry) => {
    const att_uv = geometry.getAttribute('uv');
    const v2array = [];
    let i = 0;
    const len = att_uv.count;
    while (i < len) {
        v2array.push(new THREE.Vector2(att_uv.getX(i), 1 - att_uv.getY(i)));
        i += 1;
    }
    minimap.v2array = v2array;
};
// get a vector2 from the v2 array that is scaled based on size
const getMiniMapV2 = (minimap, i) => {
    const v = minimap.v2array[i];
    if (v) {
        return v.clone().multiplyScalar(minimap.size);
    }
    return new THREE.Vector3();
};
// draw the minimap
const drawMinimap = (minimap, ctx) => {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.translate(minimap.pos.x, minimap.pos.y);
    ctx.drawImage(canvas_texture, 0, 0, minimap.size, minimap.size);
    let i = 0;
    const len = minimap.v2array.length;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'rgba(0,255,255, 0.2)';
    ctx.lineWidth = 2;
    while (i < len) {
        const v1 = getMiniMapV2(minimap, i);
        const v2 = getMiniMapV2(minimap, i + 1);
        const v3 = getMiniMapV2(minimap, i + 2);
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        i += 3;
    }
    ctx.restore();
};
// ---------- ----------
// TEXTURE
// ---------- ----------
let texture, canvas_texture;{
    const canvas = canvas_texture = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 1024;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const w = 2;
    const wp = canvas.width / w;
    const len = w * w;
    let i = 0;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '500px arial';
    ctx.lineWidth = 8;
    while (i < len) {
        const a_cell = i / len;
        const x = i % w;
        const y = Math.floor(i / w);
        ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
        ctx.fillRect(x * wp, y * wp, wp, wp);
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#8f8f8f';
        ctx.fillText(i, x * wp + wp / 2, y * wp + wp * 0.6);
        ctx.strokeText(i, x * wp + wp / 2, y * wp + wp * 0.6);
        i += 1;
    }
    texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
}
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geometry = new THREE.PlaneGeometry(2, 2, 1, 1).toNonIndexed();
geometry.rotateX(Math.PI * 1.5);
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid
const grid = new THREE.GridHelper(10, 10);
grid.material.linewidth = 3;
scene.add(grid);
// mesh1
const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture
    });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const minimap = createMiniMap(new THREE.Vector2(430, 10), 200);
camera.position.set(1, 1, 2);
camera.lookAt(0.4, 0.1, 0);
const sm = {
    FPS_UPDATE: 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT: 30, // fps rate to move object by that is independent of frame update rate
    FRAME_MAX: 900,
    secs: 0,
    frame_frac: 0, // 30.888 / 450
    frame: 0, // 30 / 450
    tick: 0, //  1 / 450 ( about 1 FPS then )
    now: new Date(),
    lt: new Date(),
    center: new THREE.Vector2(0.5, 0.5),
    radius: 0.55,
    start_angle: 0
};
const update = function (sm) {
    const a_frame = sm.frame / sm.FRAME_MAX;
    const a_rotation = a_frame * 8 % 1;
    const a_radius = 1 - Math.abs(0.5 - a_frame) / 0.5;

    sm.start_angle = Math.PI * 2 * a_rotation;
    sm.radius = 1.5 * a_radius;
    setUVRotation(geometry, sm.center, sm.radius, sm.start_angle);
    setV2array(minimap, geometry);
};
const render2d = (sm) => {
    // background
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, canvas_2d.width, canvas_2d.height);
    // draw dom element
    ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
    // draw uv minimap
    drawMinimap(minimap, ctx);
    // text overlay
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('frame : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 5);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (sm.secs > 1 / sm.FPS_UPDATE) {
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
