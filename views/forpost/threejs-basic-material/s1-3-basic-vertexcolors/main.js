//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY WITH 'color' attribute added
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
// get position attribute to find count of points
const att_pos = geometry.getAttribute('position');
// the count of points can then be used to know how much color data I need
const data_color = [];
let i = 0;
while(i < att_pos.count){
   data_color.push(Math.random(), Math.random() ,Math.random());
   i += 1;
}
// create and add color attribute
const att_color = new THREE.BufferAttribute( new Float32Array(data_color), 3 );
geometry.setAttribute('color', att_color);
//-------- ----------
// USING GEOMETRY WITH A COLOR ATTRIBUTE WITH THE BASIC MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial( { vertexColors: true } );
const box = new THREE.Mesh( geometry, material);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
