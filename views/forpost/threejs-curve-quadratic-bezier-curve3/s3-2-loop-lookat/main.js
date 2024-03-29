//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// make a curve path
const createCurvePath = (data) => {
    const curvePath = new THREE.CurvePath();
    data.forEach((a)=>{
        const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
        const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
        const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
        curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
    });
    return curvePath;
};
// create a v3 array
const createV3Array = (data, pointCount) => {
    const cp = createCurvePath(data);
    return cp.getPoints(pointCount / cp.curves.length);
};
// create points from v3 array
const createPoints = (v3Array, color) => {
    color = color || 0xffffff;
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3Array);
    return new THREE.Points(geometry, new THREE.PointsMaterial({color: color, size: 0.125 }));
};
//-------- ----------
// CURVE PATHS
//-------- ----------
const POINT_COUNT = 300; // NUMBER OF POINTS
const v3Array_pos = createV3Array([
    [5,0,5, 0,2,-7,5,3,-5], // three each (x,y,z) for start, end, and control points
    [0,2,-7,0,1.5,0,-2,4,3],
    [0,1.5,0,3,1,1,5,-1,-4],
    [3,1,1,-12,0,0,3,7,10]
], POINT_COUNT);
const v3Array_look = createV3Array([
    [-10,0,5,10,3,20,0,-3,0]
], POINT_COUNT);
//-------- ----------
// POINTS
//-------- ----------
scene.add( createPoints( v3Array_pos, 0xff0000 ) );
scene.add( createPoints( v3Array_look, 0x00ff00 ) );
//-------- ----------
// GRID, MESH
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh(
     new THREE.BoxGeometry(1,1,1),
     new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set(6, 6, 6);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
FRAME_MAX = POINT_COUNT;  // MADE THE FRAME MAX THE SAME AS THE POINT COUNT
let secs = 0,
frame = 0,
lt = new Date();
const v_start = new THREE.Vector3(0, 0, 1);
const v_delta = new THREE.Vector3(0, 0, 3);
const update = function(frame, frameMax){
    const a = frame / frameMax;
    const v1 = v3Array_pos[ frame ];
    const v2 = v3Array_look[ frame ];
    camera.position.copy(v1);
    camera.lookAt(v2);
    mesh.position.copy(v2);
};
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

