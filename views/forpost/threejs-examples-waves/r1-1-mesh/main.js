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
// GEO
//-------- ----------
const wave_opt = waveMod.parseOpt({
    width: 6,
    height: 6,
    widthSegs: 40,
    heightSegs: 40
});

const geo = waveMod.create( wave_opt );

const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }))
scene.add(mesh);
mesh.position.set( 0, 0, 0 )

//-------- ----------
// LOOP
//-------- ----------
new THREE.OrbitControls(camera, renderer.domElement);
let frame = 0, lt = new Date();
const maxFrame = 90, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // wave options and update of wave geo
        wave_opt.alpha = per;
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
