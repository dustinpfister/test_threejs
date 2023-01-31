//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 1, 0);
scene.add(dl);
//-------- ----------
// CONTROLS - if there to work with
//-------- ----------
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// ADJUST PLANE POINT HELPER
const adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    const position = geo.getAttribute('position');
    const normal = geo.getAttribute('normal');
    const i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    position.needsUpdate = true;
};
// update a geo
const updatePlaneGeo = function(geo, bias, computeNormals){
    computeNormals = computeNormals || false;
    adjustPlanePoint(geo, 0, 0 + 0.75 * bias);
    adjustPlanePoint(geo, 1, 0.75 - 1.00 * bias);
    adjustPlanePoint(geo, 2, 0.1);
    adjustPlanePoint(geo, 8, -0.4 * bias);
    // ADJUSTING NORMALS USING computeVertexNormals method
    if(computeNormals){
        geo.computeVertexNormals();
    }
};
// create a data texture
const createDataTexture = function (pr, pg, pb) {
    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    // Using the seeded random method of the MathUtils object
    const width = 16,
    height = 16,
    size = width * height;
    data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        const stride = i * 4;
        const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v * pr;
        data[stride + 1] = v * pg;
        data[stride + 2] = v * pb;
        data[stride + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    return texture;
};
//-------- ----------
// MESH
//-------- ----------
const geo1 = new THREE.PlaneGeometry(1, 1, 2, 2);
geo1.rotateX(Math.PI * 1.5);
const plane1 = new THREE.Mesh(
        geo1,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: createDataTexture(0,1,0),
            side: THREE.DoubleSide
        }));
scene.add(plane1);
const geo2 = new THREE.PlaneGeometry(1, 1, 2, 2);
geo2.rotateX(Math.PI * 1.5);
const plane2 = new THREE.Mesh(
        geo2,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: createDataTexture(0,1,1),
            side: THREE.DoubleSide
        }));
plane2.position.x = -1.1;
scene.add(plane2);
//-------- ----------
// HELPER OBJECTS - using THREE.VertexNormalsHelper method if there to work with
//-------- ----------
let helper1, helper2;
if(THREE.VertexNormalsHelper){
    helper1 = new THREE.VertexNormalsHelper(plane1, 2, 0x00ff00, 1);
    scene.add(helper1);
    helper2 = new THREE.VertexNormalsHelper(plane2, 2, 0x00ffff, 1);
    scene.add(helper2);
}
//-------- ----------
// LOOP
//-------- ----------
const state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0,
    lt: new Date()
};
const update = function (secs, per, bias, state) {
    updatePlaneGeo(geo1, bias, true);
    updatePlaneGeo(geo2, bias, false);
    if(THREE.VertexNormalsHelper){
        helper1.update();
    }
};
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    update(secs, state.per, state.bias, state);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    state.lt = now;
};
loop();
