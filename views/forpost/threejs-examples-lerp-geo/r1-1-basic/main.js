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
// SOURCE GEOS
//-------- ----------
const geo_s0 = new THREE.BoxGeometry(1, 1, 1, 12, 12);  // 442
const geo_s1 = new THREE.SphereGeometry(1, 20, 20);    // 441
console.log(geo_s0.getAttribute('position').count);
//-------- ----------
// GEO
//-------- ----------
const geo = geo_s0.clone();
//-------- ----------
// LINE
//-------- ----------
const material = new THREE.MeshNormalMaterial({ })
const mesh1 = new THREE.Mesh(geo, material);
scene.add(mesh1);
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
    lerpGeo(geo, geo_s0, geo_s1, a1);
    frame += 1;
    frame %= frameMax;
};
loop();
