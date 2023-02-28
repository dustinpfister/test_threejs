// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(5, 2, 1)
scene.add(dl);
//-------- ----------
// BREATH GROUP
//-------- ----------
const group = BreathMod.create({
    curveCount: 20,
    meshPerCurve: 16,
    radiusMin: 0.5, radiusMax: 8,
    curveUpdate: (curve, alpha, v_c1, v_c2, v_start, v_end, gud, group) => {
        const e1 = new THREE.Euler();
        e1.z = Math.PI / 180 * 60 * alpha;
        const e2 = new THREE.Euler();
        e2.z = Math.PI / 180 * -60 * alpha;
        v_c1.copy( v_start.clone().lerp(v_end, 0.25).applyEuler(e1) );
        v_c2.copy( v_start.clone().lerp(v_end, 0.75).applyEuler(e2) );
    },
    meshUpdate: (mesh, curve, alpha, index, count, group) => {
        // position
        const a_meshpos = (index + 1) / count;
        mesh.position.copy( curve.getPoint(a_meshpos * alpha) );
        // opacity
        const a_meshopacity = (1 - a_meshpos) * 0.50 + 0.50 * alpha;
        mesh.material.opacity = a_meshopacity;
        // scale
        const s = 0.25 + 2.25 * a_meshpos * Math.sin(Math.PI * 0.5 * alpha);
        mesh.scale.set( s, s, s );
    },
    material: new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.1
    })
});
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0, 8);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 150;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a_breathpart = a1;
    const a_breath = Math.sin(Math.PI * 0.5 * a_breathpart);
    BreathMod.update(group, a_breath);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();