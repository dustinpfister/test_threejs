//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 4, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MAKE MESH OBJECTS AND ADD THEM TO THE SCENE
//******** **********
var mkMesh = function(){
    return new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
};
var mesh1 = mkMesh();
scene.add(mesh1);
var mesh2 = mkMesh();
scene.add(mesh2);
var mesh3 = mkMesh();
scene.add(mesh3);
//******** **********
// Vector3 INSTANCES v1 AND v2, POSITONING MESH OBJECTS WITH THEM
//******** **********
// v1 and v2
var v1 = new THREE.Vector3(0, 0, -2);
var v2 = new THREE.Vector3(0, -2, 2);
// set mesh1 and mesh2 to the locations of v1 and v2
mesh1.position.copy(v1);
mesh2.position.copy(v2);
// SETTING POSITION OF mesh3 TO MIDPOINT BETWEEN v1 AND v2
var mv = v1.clone().add(v2).divideScalar(2);
mesh3.position.copy(mv);
//******** **********
// RENDER THE SCENE
//******** **********
renderer.render(scene, camera);
