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
var arr = [];
var c = 0;
class DataCurve extends THREE.Curve {
    constructor( data = [] ) {
        super();
        this.data = data;
        this.arcLengthDivisions = this.data.length;
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {

        var i = Math.floor( ( this.data.length - 1 ) * t );

        var a = this.data[i];

        var tx = a[0] === undefined ? 0 : a[0],
        ty = a[1] === undefined ? 0 : a[1],
        tz = a[2] === undefined ? 0 : a[2];


        //var i = Math.floor( t * ( (this.data.length - 1 ) / 3 ) );        
        //var tx = this.data[ i ] === undefined ? 0 : this.data[ i ],
        //ty = this.data[ i + 1] === undefined ? 0 : this.data[ i + 1],
        //tz = this.data[ i + 2] === undefined ? 0 : this.data[ i + 2];

arr.push(t);
//arr.push([tx, ty, tz]);
c += 1;

        return optionalTarget.set( tx * t, ty * t, tz * t );
    }
};


var path = new DataCurve([
   [0, 0.1 * 4, 0], 
   [0, 0.2 * 4, 2],
   [0, 0.4 * 4, 4],
   [0, 0.8 * 4, 6],
   [0, 0.16 * 4, 8],
   [0, 0.32 * 4, 10],
   [0, 0.64 * 4, 12]
]),
tubularSegments = 20,
radius = 1,
radialSegments = 10;
// creating a tube geometry with path and addtional arguments
var mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0x00ff00, side: THREE.DoubleSide })
);
scene.add( mesh );

console.log(c);
console.log(arr)

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
