//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(4, 4, 0xffffff, 0x008800 ));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(5, 8, 10);
camera.lookAt(0, -0.8, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX3, BOX3 Helper
//-------- ----------
const box3 = new THREE.Box3(
   new THREE.Vector3(-2, -2, -2),
   new THREE.Vector3(2, 2, 2)
);
// THE BOX3 HELPER
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// GROUP AND SET BY OBJECT
//-------- ----------
const group = new THREE.Group();
let i = 0;
const len = 40;
while(i < len){
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 0, 0),
        transparent: true,
        opacity: 0.5
    });
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        material);
    mesh.position.x = -4 + 8 * Math.random();
    mesh.position.y = -4 + 8 * Math.random();
    mesh.position.z = -4 + 8 * Math.random();
    // box3 for the mesh object
    const mesh_b3 = new THREE.Box3();
    mesh_b3.setFromObject(mesh)
    if( mesh_b3.intersectsBox( box3 ) ) {
        mesh.material.color = new THREE.Color(0, 1, 0);
    }
    group.add(mesh);
    i += 1;
}
scene.add(group);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);