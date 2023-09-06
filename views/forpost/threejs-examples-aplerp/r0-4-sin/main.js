// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a custom getAlpha method based on Math.sin
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
// MATH.SIN
//-------- ----------
const sinGetAlpha = function(state, param){
    param.piM = param.piM === undefined ? 2 : param.piM;
    param.bMulti = param.bMulti=== undefined ? 0.1 : param.bMulti;
    param.aOffset = param.aOffset=== undefined ? 0.5 : param.aOffset;
    const r = Math.PI * param.piM * state.p;
    const b = Math.sin( r );
    let a = state.p + b * param.bMulti;
    // apply aOffset
    a += param.aOffset;
    a %= 1;
    // clamp
    a = a < 0 ? 0 : a;
    a = a > 1 ? 1 : a;
    return a;
};
const v1 = new THREE.Vector3(-5, 0, 0);
const v2 = new THREE.Vector3(5, 0, 0);
let i = 0, len = 20;
while(i < len){
    const per = i / len;
    const group = apLerp.createSpheresGroup({
            v1: v1,
            v2: v2,
            count: 40,
            include: true,
            getAlpha: sinGetAlpha,
            gaParam: {
                piM: 2,
                bMulti: 0.4 - 0.399 * per,
                aOffset: 0.0
            }
        });
    group.position.z = -5 + 10 * per;
    scene.add(group);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 4, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
