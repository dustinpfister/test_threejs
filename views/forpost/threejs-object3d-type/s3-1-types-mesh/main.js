//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const geometry = new THREE.BoxGeometry();
let i = 0;
const len = 20;
while(i < len){
    const material = new THREE.MeshPhongMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// OTHER OBJECTS
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
scene.add( grid );
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// DOING SOMETHING FOR ALL TYPE MESH OBJECTS
//-------- ----------
scene.traverse( (obj) => {
    if(obj.type === 'Mesh'){
        const x = -5 + 10 * Math.random();
        const z = -5 + 10 * Math.random();
        obj.position.set(x, 0, z);
        obj.material.color.setRGB(Math.random(), Math.random(), Math.random());
    }
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
