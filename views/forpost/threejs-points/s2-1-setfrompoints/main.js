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
// ---------- ----------
// GEOMETRY
// ---------- ----------
// simple circle example of v3_array
const v3_array = createV3Array(20, function(v, i, count){
    const a1 = i / count;
    const radian = Math.PI * 2 * a1;
    v.x = Math.cos(radian) * 5;
    v.z = Math.sin(radian) * 5;
});
const geometry = createGeometryFromV3Array(v3_array);
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

