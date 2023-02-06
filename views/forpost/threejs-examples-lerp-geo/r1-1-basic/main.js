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
    new THREE.SphereGeometry(1, 26, 25),
    new THREE.TorusGeometry(1, 0.25, 26, 25)
];
console.log(source_geo[0].getAttribute('position').count);
console.log(source_geo[1].getAttribute('position').count);
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial({ wireframe: true });
//-------- ----------
// MESH
//-------- ----------
// mesh1 will be used with old lerpGeo method
const geo1 = source_geo[1].clone();
const mesh1 = new THREE.Mesh(geo1, material);
mesh1.position.set(-1,0,0)
scene.add(mesh1);
// mesh2 is created using lerpGeo.create
const mesh2 = lerpGeo.create(source_geo, material);
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
    // can still use old lerp go method
    lerpGeo(geo1, source_geo[1], source_geo[0], a1);
    // using morph target Influences of mesh object
    mesh2.morphTargetInfluences[ 0 ] = a1;
    frame += 1;
    frame %= frameMax;
};
loop();
