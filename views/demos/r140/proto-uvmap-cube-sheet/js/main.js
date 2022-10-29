//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(2, 3, 3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//  CUBE
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
    emissive: new THREE.Color(),
	//emissiveMap: texture
});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);