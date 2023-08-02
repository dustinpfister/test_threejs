//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH - Using BoxGeometry and an Array of Materials
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    ]
);
scene.add(mesh);
//-------- ----------
// MUTATION OF MATERIAL INDEX VALUES OF GROUP OBEJCTS THAT ARE ALL READY IN PLACE
//-------- ----------
const geometry = mesh.geometry;
let i = 0;
const len_groups = geometry.groups.length;
const len_materials = mesh.material.length;
while( i < len_groups ){
    const group = geometry.groups[i];
    group.materialIndex = i % len_materials;
    i += 1;
}
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set(1, 1, 2);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    mesh.rotation.y += Math.PI / 180 * 5;
    mesh.rotation.y %= Math.PI * 2;
    renderer.render(scene, camera);
};
loop();