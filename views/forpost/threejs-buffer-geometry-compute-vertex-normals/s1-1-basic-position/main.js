//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - creating from raw hard coded data
//-------- ----------
const geometry = new THREE.BufferGeometry();
const data_points = [
    -1.0,  0.0,  0.0,
     1.5,  0.0,  0.0,
     1.0,  1.0,  0.0
];
// create attributes
geometry.setAttribute('position', new THREE.Float32BufferAttribute(data_points, 3) );
//-------- ----------
// MESH with GEOMETRY, and STANDARD MATERIAL
//-------- ----------
const points = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.5 }));
scene.add(points);
// RENDER
renderer.render(scene, camera);
