//-------- ----------
// SCENE RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const nested = NestedGroupsMod.create({
    data : [
        [ [225, 315, 135, 45], [0,0,0], [0,0,0] ],
        [ [180, 180, 90, 90],  [0,1,0], [5,0,5] ],
        [ [180, 0, 0, 0],      [2,0,1], [-5, 0,-5] ]
    ]
});
scene.add(nested);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const fps = 24;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        NestedGroupsMod.update(nested, secs);
        renderer.render(scene, nested.userData.camera);
        lt = now;
    }
};
loop();
