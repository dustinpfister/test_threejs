//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GRID HELPER, CUBE GROUPS
//-------- ----------
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);
const cubes1 = CubeGroupMod.create({maxFrame: 50, fps: 30});
cubes1.position.set(4,0,4);
scene.add(cubes1);
const cubes2 = CubeGroupMod.create({maxFrame: 50, fps: 1});
cubes2.position.set(-4,0,4);
scene.add(cubes2);
const cubes3 = CubeGroupMod.create({
   anglesA:[180, 270, 90, 0],
   yDelta: 1.25,
   xzDelta: 0.75,
   maxFrame: 60,
   fps: 30,
   cubeRotations: [
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
      [0, 0, 1]
   ]
});
scene.add(cubes3);
//-------- ----------
// CONTROLS
//-------- ----------
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);
let lt = new Date();
const fps = 24;
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        CubeGroupMod.update(cubes1, secs);
        CubeGroupMod.update(cubes2, secs);
        CubeGroupMod.update(cubes3, secs);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
