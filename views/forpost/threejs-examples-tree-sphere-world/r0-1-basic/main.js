//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(12, 12, 12);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
const container = (document.getElementById('demo') || document.body );
container.appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const MATERIALS_TREE = {
    sphere: new THREE.MeshStandardMaterial({
        map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 32, 32, 150),
        side: THREE.DoubleSide
    }),
    trunk: new THREE.MeshStandardMaterial({
        color: 0xffaf80,
        map: canvasTextureMod.randomGrid(['r1', 'r1', '64'], 32, 32, 150),
        side: THREE.DoubleSide
    })
};
const MATERIALS_LIGHTS = {
    sun: new THREE.MeshStandardMaterial({
        emissive: 'white',
        emissiveMap: canvasTextureMod.randomGrid(['r1', 'r1', '0'])
    }),
    moon: new THREE.MeshStandardMaterial({
        emissive: 'white',
        emissiveMap: canvasTextureMod.randomGrid(['0', 'r1', 'ri'])
    })
};
const MATERIALS_GROUND = {
    grass: new THREE.MeshStandardMaterial({
        color: 'white',
        map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 128, 125, 200),
    })
};
//-------- ----------
// TREE WORLD OBJECTS
//-------- ----------
const worldOptions = {
    MATERIALS_GROUND: MATERIALS_GROUND,
    MATERIALS_TREE: MATERIALS_TREE,
    MATERIALS_LIGHTS: MATERIALS_LIGHTS,
    lightsDPSY: 20,
    lightsDPSZ: 5,
    worldRotation: 5
};
const world = WorldMod.create(worldOptions);
scene.add(world);
// world2
worldOptions.worldRotation = 65;
worldOptions.lightsDPSY = 75;
worldOptions.lightsDPSZ = 25;
const world2 = WorldMod.create(worldOptions);
world2.position.set(-28, -3, -5);
scene.add(world2);
// world3
worldOptions.worldRotation = 1;
worldOptions.lightsDPSX = 25;
worldOptions.lightsDPSY = 25;
worldOptions.lightsDPSZ = 0;
const world3 = WorldMod.create(worldOptions);
world3.position.set(-15, -20, -50);
scene.add(world3);
//-------- ----------
// TOGGLE FULL
//-------- ----------
let full = true;
const toggleFull = function () {
    const canvas = renderer.domElement;
    full = !full;
    container.style.position = 'static';
    container.style.width = '640px';
    container.style.height = '480px';
    container.style.zIndex = 0;
    canvas.style.width = '640px';
    canvas.style.height = '480px';
    if (full) {
        canvas.style.width = 'auto';
        canvas.style.height = window.innerHeight + 'px';
        canvas.style.margin = 'auto';
        container.style.position = 'fixed';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.background = 'black';
        container.style.left = '0px';
        container.style.top = '0px';
        container.style.zIndex = 99;
    }
};
// press f for full screen
window.addEventListener('keydown', function (e) {
    if (e.key === 'f') {
        toggleFull();
    }
});
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const sunRadian = Math.PI, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        WorldMod.update(world, secs);
        WorldMod.update(world2, secs);
        WorldMod.update(world3, secs);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();

