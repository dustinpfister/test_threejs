//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05) )
//-------- ----------
// CURVE CLASS
//-------- ----------
class CustomSinCurve extends THREE.Curve {
    constructor( a = 0.5, b = 0.25, scale = 1 ) {
        super();
        this.scale = scale;
        this.a = a;
        this.b = b;
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        let tx = t * 3 - 1.5,
        ty = Math.sin( 20 * Math.PI * t ) * (this.a * t),
        tz = Math.cos( 20 * Math.PI * t ) * (this.b * t);
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    }
};
//-------- ----------
// MESH
//-------- ----------
let path = new CustomSinCurve( 5 ),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
// creating a tube geometry with path and additional arguments
let mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0xff0000, side: THREE.DoubleSide })
);
scene.add( mesh );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let fps = 30,
frame = 0,
frameMax = 90,
lt = new Date();
let loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        let path = new CustomSinCurve( 0.25 + 0.75 * bias, 0.25, 5 );
        let geo = new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false );
        mesh.geometry.copy(geo);
        renderer.render(scene, camera);      
        lt = now;
        frame += Math.floor( fps * secs );
        frame %= frameMax;
    }
};
loop();

