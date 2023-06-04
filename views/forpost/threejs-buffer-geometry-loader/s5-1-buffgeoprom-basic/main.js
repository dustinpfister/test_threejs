//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GRID/ LIGHT / CAMERA POS
//-------- ----------
const grid = new THREE.GridHelper(100, 10);
scene.add(grid)
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
camera.position.set(20, 20, 20);
camera.lookAt( 0, 0, 0 );
//-------- ----------
// BUFFER GEOMETRY LOADER
//-------- ----------
loadBufferGeometryJSON([
   '/json/static/box_house1_solid.json',
   '/json/static/cube_thing.json',
   '/json/static/wheel.json'
], 2, 10).then( (scene_source) => {
    console.log('JSON files are loaded!');
    scene.add( scene_source );
    renderer.render(scene, camera);
}).catch( (e) => {
    console.warn('No Good.');
    console.warn(e);
});

