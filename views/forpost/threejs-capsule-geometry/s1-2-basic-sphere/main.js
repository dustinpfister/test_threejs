//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATEING A MESH WITH A CapsuleGeometry as The GEOMETRY
//-------- ----------
const radius = 5;
const geometry = new THREE.CapsuleGeometry(radius, 0, 10, 10);
const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: new THREE.Color(1,0,0),
    wireframeLinewidth : 2
});
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);
//-------- ----------
// RENDER THE SCENE
//-------- ----------
camera.position.set(12, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);