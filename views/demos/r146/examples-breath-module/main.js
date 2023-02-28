    //-------- ----------
    // BREATH MESH GROUP
    //-------- ----------
    const BreathGroup = {};
    // get a mesh object name to be used when creating and getting mesh objects in breath group
    const getMeshName = (gud, index_curve, index_mesh) => {
        return 'breath_id' + gud.id + '_curve' + index_curve + '_mesh' + index_mesh;
    };
    // update curve control points and mesh object values
    BreathGroup.update = (group, alpha) => {
        const a2 = alpha;
        const gud = group.userData;
        let index_curve = 0;
        while(index_curve < gud.curveCount){
            const curve = gud.curvePath.curves[index_curve];
            const v_start = curve.v0, v_c1 = curve.v1, v_c2 = curve.v2, v_end = curve.v3;
            const e1 = new THREE.Euler();
            e1.z = Math.PI / 180 * 60 * a2;
            const e2 = new THREE.Euler();
            e2.z = Math.PI / 180 * -60 * a2;
            v_c1.copy( v_start.clone().lerp(v_end, 0.25).applyEuler(e1) );
            v_c2.copy( v_start.clone().lerp(v_end, 0.75).applyEuler(e2) );
            let index_mesh = 0;
            while(index_mesh < gud.meshPerCurve){
                const name = getMeshName(gud, index_curve, index_mesh);
                const mesh = group.getObjectByName(name);
                const a_meshpos = (index_mesh + 1) / gud.meshPerCurve;
                // position
                mesh.position.copy( curve.getPoint(a_meshpos * a2) );
                // opacity
                const a_meshopacity = (1 - a_meshpos) * 0.50 + 0.50 * a2;
                mesh.material.opacity = a_meshopacity;
                // scale
                const s = 0.5 + 3.0 * a_meshpos * Math.sin(Math.PI * 0.5 * a2);
                mesh.scale.set( s, s, s );
                index_mesh += 1;
            }
            index_curve += 1;
        };
    };
    // main create method
    BreathGroup.create = (opt) => {
        opt = opt || {};
        const group = new THREE.Group();
        const gud = group.userData;
        gud.radiusMin = opt.radiusMin === undefined ? 0.50 : opt.radiusMin;
        gud.radiusMax = opt.radiusMax === undefined ? 2.80 : opt.radiusMax;
        gud.curveCount = opt.curveCount === undefined ? 10 : opt.curveCount;
        gud.meshPerCurve = opt.meshPerCurve === undefined ? 10 : opt.meshPerCurve;
        gud.geometry = opt.geometry || new THREE.SphereGeometry(0.1, 20, 20);
        gud.material = opt.material || new THREE.MeshPhongMaterial();
        gud.curvePath = new THREE.CurvePath();
        gud.id = opt.id || '1';
        let index_curve = 0;
        while(index_curve < gud.curveCount){
            const a_curve_index = index_curve / gud.curveCount;
            // add current curve
            const e = new THREE.Euler();
            e.z = Math.PI * 2 * a_curve_index;
            const v_start = new THREE.Vector3(1, 0, 0);
            const v_end = new THREE.Vector3(1, 0, 0);
            v_start.applyEuler(e).multiplyScalar(gud.radiusMin);
            v_end.applyEuler(e).multiplyScalar(gud.radiusMax);
            const v_c1 = v_start.clone().lerp(v_end, 0.25);
            const v_c2 = v_start.clone().lerp(v_end, 0.75);
            const curve = new THREE.CubicBezierCurve3(v_start.clone(), v_c1, v_c2, v_end);
            gud.curvePath.add(curve);
            // add mesh objects for each curve
            let index_mesh = 0;
            while(index_mesh < gud.meshPerCurve){
                const mesh = new THREE.Mesh(gud.geometry, gud.material.clone());
                mesh.material.transparent = true;
                mesh.name = getMeshName(gud, index_curve, index_mesh);
                group.add(mesh);
                index_mesh += 1;
            }
            index_curve += 1;
        };
        BreathGroup.update(group, 0);
        return group;
    };
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
const group = BreathGroup.create({
    curveCount: 20,
    meshPerCurve: 16,
    radiusMin: 0.5, radiusMax: 8,
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
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a_breathpart = a1;
    const a_breath = Math.sin(Math.PI * 0.5 * a_breathpart);
    BreathGroup.update(group, a_breath);
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