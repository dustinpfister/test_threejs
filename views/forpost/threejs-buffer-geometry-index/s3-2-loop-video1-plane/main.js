// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(9, 9) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 1, 2)
scene.add(dl);
// ---------- ----------
// HELPERS
// ---------- ----------
// create ddeltas for the traingle y values
const createTriDeltas = (geo) => {
    const pos = geo.getAttribute('position');
    const len_tri = Math.floor(pos.array.length / 9);
    let i_tri = 0;
    const deltas = [];
    while(i_tri < len_tri){
        deltas.push(-2 + 4 * Math.random() );
        i_tri += 1;
    }
    return deltas;
};
// create group helper
const createGroup = () => {
    // material
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: new THREE.Color(0,1,0),
        emissive: new THREE.Color(1,1,1),
        emissiveIntensity: 0.1
    });
    // geo indexed and non indxed
    const geo_index = new THREE.PlaneGeometry(4, 5, 20, 25);
    geo_index.rotateX(Math.PI * 1.5)
    const geo_noindex = geo_index.clone().toNonIndexed();
    const group = new THREE.Group();
    // indexed mesh
    const mesh1 = new THREE.Mesh(geo_index, material);
    mesh1.userData.pos_home = mesh1.geometry.getAttribute('position').clone();
    mesh1.userData.deltas = createTriDeltas(mesh1.geometry);
    // no index mesh
    const mesh2 = new THREE.Mesh(geo_noindex, material);
    mesh2.userData.pos_home = mesh2.geometry.getAttribute('position').clone();
    mesh2.userData.deltas = createTriDeltas(mesh2.geometry);
    group.add(mesh1);
    group.add(mesh2);
    mesh1.position.set(-2.5, 0, 0);
    mesh2.position.set(2.5, 0, 0);
    return group;
};
const updateGroup = (group, alpha) => {
    // loop over group children
    group.children.forEach( (mesh) => {
        const pos = mesh.geometry.getAttribute('position');
        const pos_home = mesh.userData.pos_home;
        let len_tri = Math.floor(pos.array.length / 9);
        let i_tri = 0;
        while(i_tri < len_tri){
            let i = i_tri * 9;
             const delta = mesh.userData.deltas[i_tri];
             pos.array[i + 1] = pos_home.array[ i + 1] + delta * alpha;
             pos.array[i + 4] = pos_home.array[i + 4] + delta * alpha;
             pos.array[i + 7] = pos_home.array[ i + 7] + delta * alpha;
             i_tri += 1;
        }
        pos.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
    });
};
const createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
// ---------- ----------
// TEXTURE
// ---------- ----------
const texture_map = createCanvasTexture(function (ctx, canvas) {
    const w = 16, h = 16;
    let i = 0, len = w * h;
    while(i < len){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = canvas.width / w * x;
        const py = canvas.height / h * y;
        const v = 0.5 * Math.random().toFixed(2);
        const color = new THREE.Color(v,v,v);
        ctx.fillStyle = color.getStyle();
        ctx.fillRect(px, py, canvas.width / w, canvas.width / h);
        i += 1;
    }
}, 64);
// ---------- ----------
// GROUP
// ---------- ----------
const group = createGroup();
scene.add(group);
group.children.forEach((mesh) => {
    mesh.material.map = texture_map;
});
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0, frame = 0, lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs( 0.5 - a1 ) / 0.5;
    updateGroup(group, a2);
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
