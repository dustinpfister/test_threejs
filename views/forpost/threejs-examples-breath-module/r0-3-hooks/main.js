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
// GEOMETRIES / MATERIALS
//-------- ----------
const geometry_center = new THREE.SphereGeometry(1.0, 20, 20);
const geometry_orbs = new THREE.SphereGeometry(0.1, 16, 16);
const material_center = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.1
});
const material_orbs = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.1
});
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(geometry_center, material_center);
scene.add(mesh1);
//-------- ----------
// BREATH GROUP
//-------- ----------
const group = BreathMod.create({
    geometry: geometry_orbs,
    material: material_orbs,
    breathsPerMinute: 1,
    breathParts: {restLow: 1, breathIn: 3, restHigh: 1, breathOut: 3},
    curveCount: 16,
    meshPerCurve: 6,
    radiusMin: 1.1, radiusMax: 2.9,
    breathsPerMinute: 5,
    breathParts: {restLow: 1, breathIn: 4, restHigh: 1, breathOut: 4},
    curveUpdate: (curve, alpha, v_c1, v_c2, v_start, v_end, gud, group) => {
        v_c1.copy( v_start.clone().lerp(v_end, 0.25) );
        v_c2.copy( v_start.clone().lerp(v_end, 0.75) );
    },
    meshUpdate: (mesh, curve, alpha, index, count, group, gud) => {
        const a_meshpos = (index + 1) / count;
        mesh.position.copy( curve.getPoint(a_meshpos * alpha) );
        mesh.material.color = new THREE.Color(1,1,1);
        const a1 = gud.a_breathpart;
        if(gud.currentBreathKey === 'restLow'){
            mesh.material.color = new THREE.Color(0,1,1);
        }
        if(gud.currentBreathKey === 'restHigh'){
            mesh.material.color = new THREE.Color(1,0,0);
        }
        if(gud.currentBreathKey === 'breathIn'){
            mesh.material.color = new THREE.Color(a1, 1 - a1, 1 - a1);
        }
        if(gud.currentBreathKey === 'breathOut'){
            mesh.material.color = new THREE.Color(1 - a1, a1, a1);
        }
    },
    hooks : {
        restLow : (updateGroup, group, a_breathpart, a_fullvid, gud) => {
            updateGroup(group, 0.05 * a_breathpart);
            group.rotation.y = Math.PI * 2 * a_breathpart;
        },
        restHigh : (updateGroup, group, a_breathpart, a_fullvid, gud) => {
            updateGroup(group, 1 - 0.05 * a_breathpart);
            group.rotation.y = Math.PI * 2 * a_breathpart * -1;
        },
        breathIn : (updateGroup, group, a_breathpart, a_fullvid, gud) => {
            updateGroup(group, 0.05 + 0.95 * Math.sin(Math.PI * 0.5 * a_breathpart) );
            group.rotation.y = 0;
        },
        breathOut : (updateGroup, group, a_breathpart, a_fullvid, gud) => {
            updateGroup(group, 0.95 - 0.95 * Math.sin(Math.PI * 0.5 * a_breathpart) );
            group.rotation.y = 0;
        }
    }
});
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0, 8);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 30 * 300;
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