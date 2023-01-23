//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CREATING OBJECTS WITH NAMES
//-------- ----------
const PREFIX = 'box';
const COLORS = ['red', 'blue', 'green'];
const COUNT = COLORS.length;
let i = 0;
while(i < COUNT){
    const geo = new THREE.BoxGeometry();
    const mat = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = PREFIX + i;
    scene.add(mesh)
    i += 1;
}
//-------- ----------
// USING GET By NAME TO GET REFERNCE TO OBJECTS
//-------- ----------
COLORS.forEach((colorStr, i) => {
    const mesh = scene.getObjectByName(PREFIX + i);
    const a_mpos = i  / ( COUNT - 1 );
    if(mesh){
        mesh.position.x = -5 + 10 * a_mpos;
        mesh.material.color = new THREE.Color(colorStr);
    }
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
