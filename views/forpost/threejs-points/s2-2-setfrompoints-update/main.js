// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// create a count of THREE.Vector3 objects with a given for point method
const createV3Array = (count, forPoint) => {
    count = count === undefined ? 100 : count;
    forPoint = forPoint || function(v, i, count){};
    const v3_array = [];
    let i = 0;
    while(i < count){
        const v = new THREE.Vector3();
        forPoint(v, i, count);
        v3_array.push(v);
        i += 1;
    };
    return v3_array;
};
// create a geometry from an array of Vector3 objects with setFromPoints method
const createGeometryFromV3Array = (v3_array) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3_array);
    return geometry;
};
// update a geometry
const updateGeometryWithV3Array = (geometry, v3_array) => {
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    while(i < att_pos.count){
        const v = v3_array[i];
        att_pos.setXYZ(i, v.x, v.y, v.z);
        i += 1;
    }
    att_pos.needsUpdate = true;
};
// ---------- ----------
// GEOMETRY
// ---------- ----------
const forPoint = {};
forPoint.circle = (radius) => {
    return (v, i, count) => {
        const a1 = i / count;
        const radian = Math.PI * 2 * a1;
        v.x = Math.cos(radian) * radius;
        v.z = Math.sin(radian) * radius;
    };
};
// ---------- ----------
// GEOMETRY
// ---------- ----------
// simple circle example of v3_array
const geometry = createGeometryFromV3Array( createV3Array(20) );
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry);
scene.add(points);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
   const a1 = frame / frameMax;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;

   const radius = 1 + 4 * a2;
   const v3_array = createV3Array(20, forPoint.circle(radius) );
   updateGeometryWithV3Array(geometry, v3_array);
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
