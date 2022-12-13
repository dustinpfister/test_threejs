//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.001, 1000);
camera.position.set(20, 20, 20);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEO
//-------- ----------
const wave_opt = waveMod.parseOpt({
    width: 2,
    height: 2,
    widthSegs: 32,
    heightSegs: 32
});
console.log(wave_opt);

const geo = waveMod.create( wave_opt );
console.log(geo);

const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }))
scene.add(mesh);
mesh.position.set(0, 0, 0);

//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {

        renderer.render(scene, camera);

        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
