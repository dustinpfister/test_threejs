//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 3);
scene.add(dl);
scene.add( new THREE.AmbientLight(0xafafaf, 0.25) );
//-------- ----------
// SOURCE GEOS
//-------- ----------
const s0 = new THREE.TorusGeometry(1, 1, 20, 20);  // 441
const s1 = new THREE.SphereGeometry(1, 20, 20);    // 441
const s2 = new THREE.ConeGeometry(1, 1, 20, 18);   // 440
const s3 = new THREE.PlaneGeometry(1, 1, 20, 20);  // 441
//console.log(s3.getAttribute('position').count);
//-------- ----------
// GEOS
//-------- ----------
const g0 = s0.clone();
const g1 = s0.clone();
const g3 = s0.clone();
//-------- ----------
// LINE
//-------- ----------
const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 4})
const line = new THREE.Line(g3, material);
scene.add(line);
//-------- ----------
// GET ALPHA HELPERS
//-------- ----------
const getAlpha = (n, d, count) => {
    return n / d * count % 1;
};
const getAlphaBias = (n, d, count) => {
    const a1 = getAlpha(n, d, count);
    return  1 - Math.abs( 0.5 - a1) / 0.5;
};
//-------- ----------
// APP LOOP
//-------- ----------
let frame = 0;
const frameMax = 300;
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    const a1 = getAlphaBias(frame, frameMax, 2);
    const a2 = getAlphaBias(frame, frameMax, 4);
    const a3 = getAlphaBias(frame, frameMax, 8);
    lerpGeo(g0, s0, s1, a1);
    lerpGeo(g1, s1, s2, a2);
    lerpGeo(g3, g0, g1, a3);
    frame += 1;
    frame %= frameMax;
};
loop();
