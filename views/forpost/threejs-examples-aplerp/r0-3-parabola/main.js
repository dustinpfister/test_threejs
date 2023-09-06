// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a custom getAlpha method based on an expression
// for a parabola
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// PARABOLA
//-------- ----------
const parabola = function(x, h, k){
    return Math.pow(x - h, 2) + k;
};
const parabolaGetAlpha = function(state, param){
    const h = 0.5, k = 0;
    const x = state.p;
    const y = parabola(x, h, k);
    const s = x <= 0.5 ? 1 : -1;
    const b = parabola(1, h, k);
    const a = state.p + (y / b) * s;
    return a;
};
const v1 = new THREE.Vector3(-5, 0, 0);
const v2 = new THREE.Vector3(5, 0, 0);
const group = apLerp.createSpheresGroup({
    v1: v1,
    v2: v2,
    count: 80,
    include: true,
    getAlpha: parabolaGetAlpha,
    gaParam: {
    }
});
scene.add(group);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 4, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

