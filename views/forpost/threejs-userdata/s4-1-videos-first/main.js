//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
scene.add(dl);
const pl = new THREE.PointLight(0xffffff, 1);
scene.add(pl);
//-------- ----------
// CUBE GROUPS
//-------- ----------
const cubes3 = CubeGroupMod.create({
   anglesA:[180, 270, 90, 0],
   yDelta: 0.25,
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
cubes3.position.y = 2;
scene.add(cubes3);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(4, 4, 4);
const update = (frame, frameMax) => {
    CubeGroupMod.setCubes(cubes3, frame, frameMax);
    camera.lookAt(cubes3.position);
};
let lt = new Date();
let frame = 0;
const frameMax = 60;
const fps = 20;
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(frame, frameMax);
        renderer.render(scene, camera);
        lt = now;
        frame += 1;
        frame %= frameMax;
    }
};
loop();
