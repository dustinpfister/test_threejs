//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05) )
//-------- ----------
// CURVE, TubeGeometry, Mesh
//-------- ----------
// basic cuve class extending three curve
class BasicCurve extends THREE.Curve {
    constructor() {
        super();
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        var tx = -2 + 4 * t,
        ty = Math.pow(2, 5 * t) / Math.pow(2, 5) * 7,
        tz = 0;
        return optionalTarget.set( tx, ty, tz );
    }
};
// creating a tube geometry with path and additional arguments using basic curve
let path = new BasicCurve(),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
let mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0xff0000, side: THREE.DoubleSide })
);
scene.add( mesh );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 3, 0);
renderer.render(scene, camera);
