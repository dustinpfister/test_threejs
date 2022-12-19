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
// GEO AND MESH
//-------- ----------
const g0 = new THREE.ConeGeometry(1, 1, 20, 18);
const g1 = new THREE.SphereGeometry(1, 20, 20);
console.log( g0.getAttribute('position').count ); // trying to get simular counts
console.log( g1.getAttribute('position').count );
const mesh = new THREE.Mesh(g0.clone(), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide}));
scene.add(mesh);
//-------- ----------
// APP LOOP
//-------- ----------
let frame = 0;
const frameMax = 300;
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    const per = frame / frameMax;
    const bias = 1 - Math.abs( per - 0.5) / 0.5;
    lerpGeo(mesh.geometry, g0, g1, bias);
    frame += 1;
    frame %= frameMax;
};
loop();
