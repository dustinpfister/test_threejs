//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
// wrap and axis
const wrapAxis = function(vec, vecMin, vecMax, axis){
    axis = axis || 'x';
    const maxD = new THREE.Vector2(vecMin[axis], 0).distanceTo( new THREE.Vector2(vecMax[axis], 0) );
    const d = new THREE.Vector2(vec[axis], 0).distanceTo( new THREE.Vector2(vecMin[axis], 0) );
    if(maxD === 0){
       vec[axis] = 0;
    }else{
        if(vec[axis] >= vecMax[axis]){
            vec[axis] = vecMin[axis] + mod(d, maxD);
        }
        if(vec[axis] < vecMin[axis]){
            vec[axis] = vecMax[axis] - mod(d, maxD);
        }
    }
};
//-------- ----------
// MESH
//-------- ----------
scene.add(new THREE.GridHelper(3, 3));
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh1.position.set(0, 0, 0);
scene.add(mesh1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const vMin = new THREE.Vector3(-1.0, 0, 0),
vMax  = new THREE.Vector3(1.0, 0, 0);
let frame = 0,
lt = new Date();
const maxFrame = 900,
fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // warp one axis
        mesh1.position.x += (-5 + 10 * bias) * secs
        wrapAxis(mesh1.position, vMin, vMax, 'x');
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();

