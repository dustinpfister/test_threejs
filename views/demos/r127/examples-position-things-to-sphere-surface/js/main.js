var scene = new THREE.Scene();

var box = new THREE.Mesh(
        new THREE.SphereGeometry(1, 40, 40),
        new THREE.MeshNormalMaterial({
            wireframe: true
        }));
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2.0, 2.0, 2.0);
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