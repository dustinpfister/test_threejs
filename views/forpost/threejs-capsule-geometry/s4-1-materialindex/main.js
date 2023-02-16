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
// GEOMETRY
//-------- ----------
const radius = 1, length = 1;
const capSegments = 10;
const radialSegments = 20;

const geometry = new THREE.CapsuleGeometry(radius, length, capSegments, radialSegments);
const geometry2 = geometry.toNonIndexed();
const count = geometry2.getAttribute('position').count;
let i = 0;
const len = count / 6;
const w = radialSegments + capSegments * 2 + 1;
while(i < count){
    const y = i % w;
    const x = Math.floor( i / w);
    const mi = y <= radialSegments - 1 || y >= radialSegments + 1 ? 0 : 1;
    geometry2.addGroup(i * 6, 6, mi);
    i += 1;
}
//-------- ----------
// MESH
//-------- ----------
const mesh2 = new THREE.Mesh(
        geometry2,
        [
           new THREE.MeshBasicMaterial({ color: new THREE.Color(0,1,1)}),
           new THREE.MeshBasicMaterial({ color: new THREE.Color(0,0,1)})
        ]
);
scene.add(mesh2);
//-------- ----------
// RENDER THE SCENE
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

