//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
//-------- ----------
// LOADING MANAGER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0,-1,0);
const manager = new THREE.LoadingManager();
manager.onLoad = () => {
    console.log('Done Loading');
    renderer.render(scene, camera);
};
//-------- ----------
// BUFFER GEOMETRY LOADER
//-------- ----------
const onBufferGeometryLoad =  (geometry) => {
    geometry.rotateX(Math.PI * 1.50);
    geometry.rotateY(Math.PI * 1.10);
    const mesh = new THREE.Mesh(
       geometry,
        new THREE.MeshPhongMaterial({
            color: 0x00ff0000,
            emissive: 0x2a2a2a,
            side: THREE.DoubleSide
        }));
    scene.add(mesh);
};
const loader = new THREE.BufferGeometryLoader(manager);
loader.load('/json/static/box_house1_solid.json', onBufferGeometryLoad);

