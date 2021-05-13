var scene = new THREE.Scene();

// create a wrap group
var wrap = new THREE.Group();

// add a sphere to the wrap
var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 40, 40),
        new THREE.MeshNormalMaterial({
            wireframe: true
        }));
wrap.userData.sphere = sphere;
wrap.add(sphere);

var surface = new THREE.Group();
wrap.userData.surface = surface;
wrap.add(surface);

// create a cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshNormalMaterial({
            wireframe: false
        }));
wrap.userData.cube = cube;
wrap.userData.surface.add(cube);


var d = 1.25,
lat = 0.75,
long = 0

var radian = Math.PI * -0.5 + Math.PI * lat,
x = Math.cos(radian) * d,
y = Math.sin(radian) * d;
cube.position.set(x, y, 0);

surface.rotation.y = Math.PI * 1.5;

cube.lookAt(0,0,0);


// add wrap the the scene
scene.add(wrap);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 0.0, 0.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement)


var loop = function(){
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}
loop();