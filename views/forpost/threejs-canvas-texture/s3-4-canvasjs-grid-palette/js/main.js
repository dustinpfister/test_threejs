//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, -3, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj = canvasMod.create({
    draw: 'grid_palette',
    size: 512,
    update_mode: 'canvas',
    state: {
       w: 2, h: 2,
       data: [0,2,3,4]
    },
    palette: ['white', 'black', 'red', 'green', 'blue']
});
//-------- ----------
// GEO, MATERIAL, MESH
//-------- ----------
const geo = new THREE.PlaneGeometry(10, 10, 1, 1);
geo.rotateX(Math.PI * 1.5);
const material = new THREE.MeshBasicMaterial({ map: canObj.texture });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh)
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
renderer.render(scene, camera);

