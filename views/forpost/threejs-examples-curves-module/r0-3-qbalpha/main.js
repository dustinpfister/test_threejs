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


const curve1 = curveMod.QBC3(0.00, 0.00, 0,   0.25, 1.00, 0,         0, 0, 0);
const curve2 = curveMod.QBC3(0.25, 1.00, 0,   0.50, 1.00, 0,         0, 0, 0);
const curve3 = curveMod.QBC3(0.50, 1.00, 0,   0.75, 0.50, 0,         0, 0, 0);
const curve4 = curveMod.QBC3(0.75, 0.50, 0,   1.00, 0.25, 0,         0, 0, 0);

const cp1 = new THREE.CurvePath();
cp1.add(curve1);
cp1.add(curve2);
cp1.add(curve3);
cp1.add(curve4);


//console.log(curve1.getPoint(1));
//console.log(curve2.getPoint(0));

let alpha = 0.77;
// CURVE PATHS ARE OFF
console.log( 'return alpha = ' + cp1.getPoint( alpha ).y ); // 0.9377406055484174

// SOMETHING LIKE THIS THEN SEEMS TO WORK BETTER
const cLen = cp1.curves.length;
const curveIndex = Math.floor( cLen * alpha);
const cc = cp1.curves[ curveIndex];
const a_cc = alpha %  ( 1 / cLen ) * ( cLen );
console.log('curveIndex= ' + curveIndex, 'a_cc=' + a_cc);
console.log( cc.getPoint( a_cc ) ); // 1 

/*
const createAlphaCurve = (grc_points) => {
    let i = 0, len = grc_points.length;
    const data = [];
    while(i < len - 1){
        const s = grc_points[i];
        const e = grc_points[i + 1];
        data.push([ s[0], s[1], 0, e[0], e[1], 0, 0, 0, 0 ]);
        i += 1;
    }
    return curveMod.QBCurvePath(data);
};

const createAlphaFunciton = ( grc_points ) => {

//    const curve = createAlphaCurve(grc_points);
//    return function(givenAlpha){
//        return curve.getPoint(givenAlpha).y;
//    };

    const cp = createAlphaCurve(grc_points);

    return function(alpha){
        const cc = cp.curves[ Math.round( (cp.curves.length - 1) * alpha) ];
        const i = alpha %  ( 1 / cp.curves.length ); 
        return cc.getPoint( i ).y; 
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
    [0.00, 0.00,     0,0],
    [0.25, 1.00,     0,0],
    [0.75, 0.50,     0,0],
    [1.50, 0.10,     0,0]
];
const curveAlpha = createAlphaFunciton( grc_points );


console.log( curveAlpha(1 / 2.5) );

const points = debugAlphaFunction(curveAlpha);
scene.add(points);
*/

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
     //const a2 = curveAlpha(a1);

     //mesh.position.x = -5 + 10 * a1;
     //mesh.position.z = 5 - 10 * a2;

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