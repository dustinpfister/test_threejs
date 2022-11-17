//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}

const createAlphaCurve = (grc_points) => {
    let i = 0, len = grc_points.length;
    const data = [];
    while(i < len - 1){
        const s = grc_points[i];
        const e = grc_points[i + 1];
        data.push([ s[0], s[1], 0, e[0], e[1], 0, 0, 0, 0 ]);

//const s = grc_points[i];
//data.push([ s[0], s[1], 0, s[2], s[3], 0, 0, 0, 0 ]);

        i += 1;
    }
    return curveMod.QBCurvePath(data);
};

const createAlphaFunciton = ( grc_points ) => {
    const curve = createAlphaCurve(grc_points);
    return function(givenAlpha){
        return curve.getPoint(givenAlpha).y;
    };
};

const debugAlphaFunction = (alphaFunc, opt) => {
    opt = opt || {};
    opt.count = opt.count === undefined ? 100 : opt.count;
    opt.sx = -5;
    opt.sz = 5;
    opt.w = 10;
    opt.h = -10;
    const v3Array = [];
    let i = 0;
    while(i < opt.count){
        const a1 = i / opt.count;
        const x = opt.sx + a1 * opt.w;
        const z = opt.sz + alphaFunc(a1) * opt.h;
        v3Array.push( new THREE.Vector3( x, 0 , z) );
        i += 1;
    }
    const points = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints( v3Array ),
        new THREE.PointsMaterial({ size: 0.25, color: new THREE.Color(0, 1, 0)})
    );
    return points;
};

const grc_points = [
//    [0.00, 0.00, 0.25, 1.00,     0,0],
//    [0.25, 1.00, 0.75, 0.50,     0,0],
//    [0.75, 0.50, 1.00, 0.10,     0,0]
    [0.00, 0.00,     0,0],
    [0.25, 1.00,     0,0],
    [0.75, 0.50,     0,0],
    [1.50, 0.10,     0,0]
];
const curveAlpha = createAlphaFunciton( grc_points );


console.log( curveAlpha(0.25) );

const points = debugAlphaFunction(curveAlpha);
scene.add(points);

//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     const a1 = frame / frameMax;
     const a2 = curveAlpha(a1);

     mesh.position.x = -5 + 10 * a1;
     mesh.position.z = 5 - 10 * a2;

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