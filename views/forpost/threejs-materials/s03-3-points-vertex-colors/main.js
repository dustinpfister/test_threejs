//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// POINTS MATERIAL
//-------- ----------
const material1 = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.8,
    sizeAttenuation: true
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(7, 7, 7, 5, 5, 5);
const pos = geometry.getAttribute('position');
const data_color = [];
let i = 0;
while(i < pos.count){
    const a_count = i / pos.count;
    const r = 0, g = a_count, b = 1 - a_count;
    data_color.push( r, g, b)
    i += 1;
}
geometry.setAttribute('color', new THREE.BufferAttribute( new Float32Array( data_color ), 3 ) );
//-------- ----------
// MESH
//-------- ----------
const points1 = new THREE.Points(geometry, material1);
scene.add(points1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(9, 9, 9);
camera.lookAt(0, -1.0, 0);
renderer.render(scene, camera);
