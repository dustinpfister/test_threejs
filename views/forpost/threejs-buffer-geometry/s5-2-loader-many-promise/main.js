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
const loadBufferGeometryJSON = ( urls = [], w = 2, scale = 5, material = new THREE.MeshNormalMaterial() ) => {
    const scene_source = new THREE.Scene();
    const onBuffLoad =  (geometry, i) => {
        const x = i % w;
        const z = Math.floor( i / w);
        const mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(x, 0, z).multiplyScalar(scale);
        scene_source.add(mesh);
    };
    const onBuffProgress =  (geometry) => {};
    return new Promise( ( resolve, reject ) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            resolve(scene_source);
        };
        const onBuffError =  (err) => {
           reject(err);
        };
        const loader = new THREE.BufferGeometryLoader(manager);
        urls.forEach( (url, index) => {
            loader.load(url, (geometry) => { onBuffLoad(geometry, index) }, onBuffProgress, onBuffError);
        });
    });
};
//-------- ----------
// GRID/ LIGHT / CAMERA POS
//-------- ----------
const grid = new THREE.GridHelper(100, 10);
scene.add(grid)
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
camera.position.set(-10, 15, 15);
camera.lookAt( 5, 0, 5);
//-------- ----------
// BUFFER GEOMETRY LOADER
//-------- ----------
const URLS = [
   '/json/vertcolor-trees/6tri/one.json',
   '/json/vertcolor-trees/6tri/two.json',
   '/json/vertcolor-trees/6tri/three.json',
   '/json/vertcolor-trees/6tri/four.json'
];
const material = new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.DoubleSide });
loadBufferGeometryJSON(URLS, 2, 10, material)
.then( (scene_source) => {
    console.log('JSON files are loaded!');
    scene.add( scene_source );
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn('No Good.');
    console.warn(e);
});

