//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LINE MATERIAL
//-------- ----------
const material = new THREE.LineBasicMaterial({
    linewidth: 3,
    color: new THREE.Color('lime'),
    transparent: true,
    opacity: 0.25
});
//-------- ----------
// GEO, SCENE CHILD OBJECTS
//-------- ----------
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const edgeGeo = new THREE.EdgesGeometry(boxGeo);
const line = new THREE.LineSegments( edgeGeo, material );
line.rotation.y = Math.PI / 180 * 12;
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
