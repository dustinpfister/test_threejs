//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material_mesh = new THREE.MeshBasicMaterial({ vertexColors: true });
const material_line = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 2});
const material_points = new THREE.PointsMaterial({ vertexColors: true, size: 0.25 });
//-------- ----------
// GEOMETRY - with color
//-------- ----------
const geometry = new THREE.SphereGeometry( 1, 16, 16 );
const len = geometry.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a_len = i / len;
   color_array.push(a_len, 0,  0 );
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array( color_array ), 3);
geometry.setAttribute('color', color_attribute);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points = new THREE.Points( geometry, material_points );
points.position.x = 2;
scene.add(points);
const line = new THREE.Line( geometry, material_line );
line.position.x = 0;
scene.add(line);
const mesh = new THREE.Mesh( geometry, material_mesh );
mesh.position.x = -2;
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

