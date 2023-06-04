//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER
//-------- ----------
const loadBufferGeometryJSON = ( urls = [], material = new THREE.MeshNormalMaterial() ) => {
    const scene_source = new THREE.Scene();
    let object_index = 0;
    // for each loaded geometry...
    const onBufferGeometryLoad =  (geometry) => {
        const mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(6 * object_index, 0, 1.8 * object_index);
        scene_source.add(mesh);
        object_index += 1;
    };
    return new Promise( ( resolve, reject ) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            resolve(scene_source);
        };
        manager.onError = (url) => {
            reject( new Error('Error with file: ' + url) );
        };
        const loader = new THREE.BufferGeometryLoader(manager);
        urls.forEach( (url) => {
           loader.load(url, onBufferGeometryLoad);
        });
    });
};
//-------- ----------
// GRID/ LIGHT / CAMERA POS
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
scene.add(grid)
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
camera.position.set(-10, 15, 15);
camera.lookAt(0,-1,0);
//-------- ----------
// BUFFER GEOMETRY LOADER
//-------- ----------
loadBufferGeometryJSON([
   '/json/static/box_house1_solid.json',
   '/json/static/cube_thing.json',
   '/json/static/wheel.json'
]).then( (scene_source) => {
    console.log('JSON files are loaded!');
    scene.add( scene_source );
    renderer.render(scene, camera);
}).catch( (e) => {
    console.warn('No Good.');
    console.warn(e);
});

