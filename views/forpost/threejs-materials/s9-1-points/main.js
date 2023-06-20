//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// POINTS MATERIAL
//-------- ----------
const material = new THREE.PointsMaterial( { color: 0x00afaf } );
//-------- ----------
// GEOETRY WITH JUST A POSITION ATTRIBUTE
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0,
    1, 0, 0,
    1, 1, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
