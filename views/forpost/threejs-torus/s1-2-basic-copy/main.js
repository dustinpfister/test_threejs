//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a Doughnut geo
const createDoughnutGeo = (opt) => {
    opt = opt || {};
    opt.r = opt.r === undefined ? 0.5 : opt.r;
    opt.tr = opt.tr === undefined ? 0.25 : opt.tr;
    opt.rs = opt.rs === undefined ? 30 : opt.rs;
    opt.ts = opt.ts === undefined ? 30 : opt.ts;
    const geo = new THREE.TorusGeometry(opt.r, opt.tr, opt.rs, opt.ts);
    geo.rotateX(Math.PI * 0.5);
    return geo;
};
// create a donut Mesh
const createDoughnutMesh = (opt) => {
    opt = opt || {};
    const geo = createDoughnutGeo(opt)
    // create mesh
    const doughnut = new THREE.Mesh(
        geo,
        opt.material || new THREE.MeshNormalMaterial());
    return doughnut;
};

//-------- ----------
// ADD MESH TO SCENE
//-------- ----------
const mesh1 = createDoughnutMesh({});
scene.add(mesh1);
const mesh2 = createDoughnutMesh({});
mesh2.position.x = -2;
scene.add(mesh2);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
let lt = new Date(),
frame = 0;
const maxFrame = 300,
fps = 30;
const loop = function(){
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000,
    bias = THREE.MathUtils.pingpong(per - 0.5, 1) * 2;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // copying new geos to old geo of mesh objects
        mesh1.geometry.copy( createDoughnutGeo({
            rs: 3 + 27 * bias, 
            ts: 3 + 27 * bias}));
        mesh2.geometry.copy( createDoughnutGeo({
            r: 0.75 + 0.125 * bias,
            tr: 0.25 - 0.125 * bias }));
        // render step
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
