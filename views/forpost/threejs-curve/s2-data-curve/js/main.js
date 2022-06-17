//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);

scene.add( new THREE.AmbientLight(0xffffff, 0.05) )

//******** **********
// CURVE, TubeGeometry, Mesh
//******** **********
class CustomCurve extends THREE.Curve {
    constructor( data = [], scale = 1 ) {
        super();
        this.scale = scale;
        this.data = data;
        this.arcLengthDivisions = data.length * 30 * 2;
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        var data = this.data;
        var el = data[ Math.floor( (data.length - 1) * t ) ];
        var tx = -4 + 8 * t,
        ty = el[0],
        tz = el[1];
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    }
};

var path = new CustomCurve( [[0, 0], [2, 0], [0, 5], [2, 5], [2, -2], [2, -2], [3, -2], [2, -2]], 1 ),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
// creating a tube geometry with path and addtional arguments
var mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0x00ff00, side: THREE.DoubleSide })
);
scene.add( mesh );


//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        renderer.render(scene, camera);      
        lt = now;
    }
};
loop();
