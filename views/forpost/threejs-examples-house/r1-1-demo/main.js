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
light.intensity = 0.1;
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
const len = 5 * 5;
while(i < len){
    const x = i % size;
    const y = Math.floor( i / size );
    const px = x * size;
    const py = y * size;

    //const c = new THEEE.Color(1, 0.25 + 0.75 * Math.random(),1);
    //ctx.fillStyle = c.getStyle();
    //ctx.fillRect(px, py, size, size);

    i += 1;
}
//const texture = new THREE.CanvasTexture(canvas);
//-------- ----------
// ADD THE HOUSE, AND OTHER OBJECTS
//-------- ----------
// add the house
const house = HouseMod.create();
house.position.set(-2, 1.05, 0);
scene.add(house);
// ground
const materials = {
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    })
};
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
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
