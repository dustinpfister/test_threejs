//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(5, 5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 2, 8);
camera.lookAt(0, -0.8, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX3, BOX3 Helper
//-------- ----------
const box3 = new THREE.Box3();
// THE BOX3 HELPER
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// GROUP AND SET BY OBJECT
//-------- ----------
const group = new THREE.Group();
let i = 0;
const len = 3;
while(i < len){
    const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial() );
    mesh.position.x = -2.5 + 5 * Math.random();
    mesh.position.y = -2.5 + 5 * Math.random();
    mesh.position.z = -2.5 + 5 * Math.random();
    group.add(mesh);
    i += 1;
}
scene.add(group);
box3.setFromObject(group);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);