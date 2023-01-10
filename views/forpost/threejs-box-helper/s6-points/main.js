//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - custom buffer geometry with only a position attribute
//-------- ----------
const point_count = 300;
const point_array = [];
let i = 0;
while(i < point_count){
    const x = -2 + 4 * Math.random();
    const y = Math.random();
    const z = -2 + i / point_count * 4;
    point_array.push(x, y, z);
    i += 1;
}
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute( new Float32Array(point_array), 3 ) );
//-------- ----------
// Points
//-------- ----------
const points = new THREE.Points( geo,  new THREE.PointsMaterial({ size: 0.25 }));
scene.add( points );
//-------- ----------
// BOX HELPER OF POINTS
//-------- ----------
points.add( new THREE.BoxHelper(points, 0xffffff) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
