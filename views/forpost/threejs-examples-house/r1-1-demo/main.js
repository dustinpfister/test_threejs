const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer(); // using WebGL1
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.castShadow = true;
scene.add(dl);
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
// add AmbientLight
const light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.4;
scene.add(light);
//-------- ----------
// CANVAS ELEMENT, TEXTURE
//-------- ----------
const size = 64;
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = size;
canvas.height = size;
let i = 0;
const w = 10;
const len = w * w;
const pxSize = size / w;
while(i < len){
    const x = i % w;
    const y = Math.floor( i / w );
    const px = x * pxSize;
    const py = y * pxSize;
    const v = 0.25 + 0.75 * Math.random();
    const c = new THREE.Color(v, v, v);
    ctx.fillStyle = c.getStyle();
    ctx.fillRect(px, py, pxSize, pxSize);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
// ground
const materials = {
    base: new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        map: texture,
        //side: THREE.DoubleSide
    }),
    tri: new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        map: texture,
        //side: THREE.DoubleSide
    }),
    roof: new THREE.MeshStandardMaterial({
       color: 0x202020,
       //side: THREE.DoubleSide
    }),
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        map: texture,
        //side: THREE.DoubleSide
    })
};
//-------- ----------
// ADD THE HOUSE, AND OTHER OBJECTS
//-------- ----------
// add the house
const house = HouseMod.create(materials);
house.position.set(-2, 1.05, 0);
scene.add(house);
// add a plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 1, 1), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
//-------- ----------
// APP LOOP
//-------- ----------
// CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// Loop in which the directional light position changes
let frame = 0;
const maxFrame = 100;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame,
    r = Math.PI * 2 * per;
    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    controls.update();
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
