//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
//scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.001, 1000);
camera.position.set(10, 8, 10);
camera.lookAt(0, -2, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const getAlpha = (n, d, c) => {
    return (n / d * c) % 1;
};
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// TEXTURE
//-------- ----------
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Uisng the seeded random method of the MathUtils object
const width = 32, height = 32;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4;
    const v = 50 + Math.floor( THREE.MathUtils.seededRandom() * 205 );
    data[ stride ] = 0;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = 0;
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
//-------- ----------
// GEO
//-------- ----------
const wave_opt = waveMod.parseOpt({
    width: 10,
    height: 10,
    waveHeight: 0.5,
    xWaveCount: 2,
    zWaveCount: 2,
    widthSegs: 50,
    heightSegs: 50
});

const geo = waveMod.create( wave_opt );

//const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, wireframe: true });
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: texture });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.position.set( 0, 0, 0 )

//-------- ----------
// LOOP
//-------- ----------
//new THREE.OrbitControls(camera, renderer.domElement);
let frame = 0, lt = new Date();
const maxFrame = 800, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    //per = frame / maxFrame,
    //bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // wave options and update of wave geo
        wave_opt.alpha = getAlpha(frame, maxFrame, 32);
        wave_opt.degree = 360 * getAlpha(frame, maxFrame, 1);
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
