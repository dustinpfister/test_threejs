//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SOURCE GEOS
//-------- ----------
const source_geo = [
    new THREE.SphereGeometry(1, 20, 20), // 441
    new THREE.BoxGeometry(1, 1, 1, 12, 12) // 442
];
//console.log(geo_s0.getAttribute('position').count);
//-------- ----------
// GEO
//-------- ----------
const geo1 = source_geo[1].clone();

const geo2 = lerpGeo.create(source_geo);

//-------- ----------
// MESH
//-------- ----------
const material = new THREE.MeshNormalMaterial({ })
const mesh1 = new THREE.Mesh(geo1, material);
mesh1.position.set(-1,0,0)
scene.add(mesh1);

const mesh2 = new THREE.Mesh(geo2, material);
mesh2.position.set(1,0,0)
scene.add(mesh2);

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
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
let frame = 0;
const frameMax = 300;
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    const a1 = getAlphaBias(frame, frameMax, 2);
    lerpGeo(geo1, source_geo[1], source_geo[0], a1);
    frame += 1;
    frame %= frameMax;
};
loop();
