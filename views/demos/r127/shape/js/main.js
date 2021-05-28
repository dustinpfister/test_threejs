 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));

// make the shape
var tri = new THREE.Shape();
tri.moveTo( 0, 1 );
tri.lineTo( 1, -1 );
tri.lineTo( -1, -1 );
// geometry
var extrudeSettings = { depth: 1, bevelEnabled: false};
var geometry = new THREE.ExtrudeGeometry( tri, extrudeSettings );
geometry.rotateX(Math.PI * 1);  // might want to center
geometry.center();
// mesh
var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// loop
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 120,
    fps: 30,
    per: 0
};
var loop = function () {
    // USING THE GET DELTA METHOD
    var secs = state.clock.getDelta();
    state.per = state.frame / state.maxFrame;
    requestAnimationFrame(loop);
    mesh.rotation.y = Math.PI * 2 * state.per;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    renderer.render(scene, camera);
};
loop();