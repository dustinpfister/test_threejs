//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
//scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.001, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// GEO
//-------- ----------
const wave_opt = waveMod.parseOpt({
    width: 10,
    height: 10,
    waveHeight: 0.5,
    xWaveCount: 2,
    zWaveCount: 2,
    widthSegs: 40,
    heightSegs: 40
});

const geo = waveMod.create( wave_opt );

//const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, wireframe: true });
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.position.set( 0, 0, 0 )

//-------- ----------
// LOOP
//-------- ----------
new THREE.OrbitControls(camera, renderer.domElement);
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // wave options and update of wave geo
        wave_opt.alpha = per;
        wave_opt.zWaveCount = -2 + 4 * bias;
        waveMod.update(geo, wave_opt);
        // render
        renderer.render(scene, camera);
        // step frame
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
